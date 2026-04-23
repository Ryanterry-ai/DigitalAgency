import crypto from "node:crypto";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import {
  AdvanceRequestRecord,
  AtmSiteRecord,
  AttendanceRecord,
  DashboardMetrics,
  EmployeeRecord,
  ExpenseRecord,
  FlmTaskRecord,
  LeaveRequestRecord,
  NotificationRecord,
  OrderRecord,
  RetailerRecord,
  RetailVisitRecord,
  SalaryRecord,
  SiteVisitRecord,
  UserSession,
} from "@/types/entities";
import { mockDb } from "@/server/store/mock-db";

const usingMock = env.isPreviewMode;
const TEST_OTP_CODE = "123456";
const forceStaticTestOtp = true;
const allowTestBypass = forceStaticTestOtp || env.otpDevFallback;

const hashOtp = (code: string) => crypto.createHash("sha256").update(code).digest("hex");

const safeDate = (value?: string) => (value ? new Date(value).toISOString() : new Date().toISOString());
const daysBetweenInclusive = (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return 1;
  }
  const ms = Math.max(0, toDate.getTime() - fromDate.getTime());
  return Math.floor(ms / (24 * 60 * 60 * 1000)) + 1;
};

const mapEmployeeName = (employeeId?: string) =>
  mockDb.employees.find((employee) => employee.id === employeeId)?.fullName;

const ensureMockUserSession = (mobile: string) => {
  const cleanMobile = mobile.trim();
  let user = mockDb.users.get(cleanMobile);
  if (!user) {
    const employee = mockDb.employees.find((entry) => entry.mobile === cleanMobile);
    user = {
      id: mockDb.id("usr"),
      mobile: cleanMobile,
      role: employee?.category === "admin" ? "admin" : "employee",
      employeeId: employee?.id,
      name: employee?.fullName ?? "Field Employee",
    };
    mockDb.users.set(cleanMobile, user);
  }
  return user;
};

const findMockUserByEmployee = (employeeId: string): { mobile: string; user: UserSession } | null => {
  let matched: { mobile: string; user: UserSession } | null = null;
  mockDb.users.forEach((user, mobile) => {
    if (!matched && user.employeeId === employeeId) {
      matched = { mobile, user };
    }
  });
  return matched;
};

const syncEmployeeUserAccount = (employee: EmployeeRecord, previousMobile?: string) => {
  const employeeUser = findMockUserByEmployee(employee.id);
  const nextMobile = employee.mobile.trim();
  const oldMobile = previousMobile?.trim();

  if (employeeUser && employeeUser.mobile !== nextMobile) {
    mockDb.users.delete(employeeUser.mobile);
  }

  if (oldMobile && oldMobile !== nextMobile && mockDb.users.get(oldMobile)?.employeeId === employee.id) {
    mockDb.users.delete(oldMobile);
  }

  const existingAtNextMobile = mockDb.users.get(nextMobile);
  const baseId = employeeUser?.user.id ?? existingAtNextMobile?.id ?? mockDb.id("usr");
  const role = employee.category === "admin" || existingAtNextMobile?.role === "admin" ? "admin" : "employee";

  mockDb.users.set(nextMobile, {
    id: baseId,
    mobile: nextMobile,
    role,
    employeeId: employee.id,
    name: employee.fullName,
  });
};

export async function requestOtp(mobile: string) {
  const cleanMobile = mobile.trim();
  const user = ensureMockUserSession(cleanMobile);

  const existingOtp = mockDb.otpStore.get(cleanMobile);
  if (!allowTestBypass && existingOtp && existingOtp.expiresAt > Date.now()) {
    return {
      ok: false as const,
      expiresAt: existingOtp.expiresAt,
      remainingSeconds: Math.ceil((existingOtp.expiresAt - Date.now()) / 1000),
    };
  }

  const code = allowTestBypass ? TEST_OTP_CODE : String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000;
  mockDb.otpStore.set(cleanMobile, {
    codeHash: hashOtp(code),
    expiresAt,
    attempts: 0,
  });

  if (!usingMock) {
    void prisma.user
      .upsert({
        where: { mobile: cleanMobile },
        update: {},
        create: { mobile: cleanMobile, role: user.role },
      })
      .then((dbUser) =>
        prisma.otpToken.create({
          data: {
            userId: dbUser.id,
            codeHash: hashOtp(code),
            expiresAt: new Date(expiresAt),
          },
        }),
      )
      .catch(() => {
        // Keep login flow alive if DB is unavailable.
      });
  }

  return {
    ok: true as const,
    expiresAt,
    devCode: allowTestBypass ? code : undefined,
  };
}

export async function verifyOtp(mobile: string, code: string): Promise<UserSession | null> {
  const cleanMobile = mobile.trim();

  if (allowTestBypass && code === TEST_OTP_CODE) {
    const session = ensureMockUserSession(cleanMobile);
    mockDb.otpStore.delete(cleanMobile);
    return session;
  }

  const otp = mockDb.otpStore.get(cleanMobile);
  if (!otp) {
    return null;
  }

  if (!allowTestBypass && otp.expiresAt < Date.now()) {
    mockDb.otpStore.delete(cleanMobile);
    return null;
  }

  if (otp.codeHash !== hashOtp(code)) {
    otp.attempts += 1;
    mockDb.otpStore.set(cleanMobile, otp);
    return null;
  }

  const session = mockDb.users.get(cleanMobile) ?? null;
  mockDb.otpStore.delete(cleanMobile);

  if (!session) {
    return null;
  }

  return session;
}

export async function getDashboardOverview() {
  const metrics = mockDb.metricSnapshot();

  const expenseByType = ["salary", "advance", "petrol", "maintenance", "other"].map((type) => ({
    name: type.replace("_", " "),
    value: mockDb.expenses
      .filter((item) => item.expenseType === type)
      .reduce((sum, item) => sum + item.amount, 0),
  }));

  const issueTrend = [
    { label: "Mon", pending: 4, resolved: 3 },
    { label: "Tue", pending: 3, resolved: 4 },
    { label: "Wed", pending: 2, resolved: 3 },
    { label: "Thu", pending: 5, resolved: 2 },
    { label: "Fri", pending: 2, resolved: 6 },
    { label: "Sat", pending: metrics.pendingIssues, resolved: metrics.resolvedIssues },
  ];

  const retailTrend = [
    { label: "W1", visits: 12, orders: 7 },
    { label: "W2", visits: 15, orders: 9 },
    { label: "W3", visits: 18, orders: 11 },
    { label: "W4", visits: metrics.retailVisits, orders: metrics.ordersBooked },
  ];

  const recentTransactions = mockDb.orders.slice(0, 8).map((order, index) => {
    const unitPrice = 1800 + ((index + 2) % 5) * 450;
    const total = unitPrice * order.quantity;
    return {
      id: order.id.toUpperCase(),
      customer: order.shopName,
      product: order.productName,
      status:
        order.orderStatus === "canceled"
          ? ("refunded" as const)
          : order.orderStatus === "new"
            ? ("pending" as const)
            : ("success" as const),
      quantity: order.quantity,
      unitPrice,
      total,
    };
  });

  return {
    metrics,
    issueTrend,
    retailTrend,
    expenseByType,
    recentNotifications: mockDb.notifications.slice(0, 6),
    recentTransactions,
  };
}

export async function listEmployees(search?: string) {
  const query = search?.trim().toLowerCase();
  if (!query) return mockDb.employees;

  return mockDb.employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(query) ||
      employee.employeeCode.toLowerCase().includes(query) ||
      employee.mobile.includes(query),
  );
}

export async function getEmployeeById(id?: string) {
  if (!id) return null;
  return mockDb.employees.find((employee) => employee.id === id) ?? null;
}

export async function createEmployee(input: Omit<EmployeeRecord, "id">) {
  const record: EmployeeRecord = {
    ...input,
    id: mockDb.id("emp"),
  };
  mockDb.employees.unshift(record);
  syncEmployeeUserAccount(record);
  return record;
}

export async function updateEmployee(id: string, patch: Partial<EmployeeRecord>) {
  const index = mockDb.employees.findIndex((employee) => employee.id === id);
  if (index < 0) return null;

  const previous = mockDb.employees[index];
  const merged = { ...previous, ...patch };
  mockDb.employees[index] = merged;
  syncEmployeeUserAccount(merged, previous.mobile);
  return mockDb.employees[index];
}

export async function deleteEmployee(id: string) {
  const index = mockDb.employees.findIndex((employee) => employee.id === id);
  if (index < 0) return false;
  const [removed] = mockDb.employees.splice(index, 1);
  const linked = findMockUserByEmployee(id);
  if (linked) {
    mockDb.users.delete(linked.mobile);
  } else if (removed?.mobile && mockDb.users.get(removed.mobile)?.employeeId === id) {
    mockDb.users.delete(removed.mobile);
  }
  return true;
}

export async function listAtmSites(search?: string) {
  const query = search?.trim().toLowerCase();
  if (!query) return mockDb.atmSites;

  return mockDb.atmSites.filter(
    (site) =>
      site.siteName.toLowerCase().includes(query) ||
      site.siteCode.toLowerCase().includes(query) ||
      site.city.toLowerCase().includes(query),
  );
}

export async function createAtmSite(input: Omit<AtmSiteRecord, "id" | "assignedEmployeeName">) {
  const record: AtmSiteRecord = {
    ...input,
    id: mockDb.id("site"),
    assignedEmployeeName: mapEmployeeName(input.assignedEmployeeId),
  };
  mockDb.atmSites.unshift(record);
  return record;
}

export async function updateAtmSite(id: string, patch: Partial<AtmSiteRecord>) {
  const index = mockDb.atmSites.findIndex((site) => site.id === id);
  if (index < 0) return null;

  mockDb.atmSites[index] = {
    ...mockDb.atmSites[index],
    ...patch,
    assignedEmployeeName: patch.assignedEmployeeId
      ? mapEmployeeName(patch.assignedEmployeeId)
      : mockDb.atmSites[index].assignedEmployeeName,
  };

  return mockDb.atmSites[index];
}

export async function deleteAtmSite(id: string) {
  const index = mockDb.atmSites.findIndex((site) => site.id === id);
  if (index < 0) return false;
  mockDb.atmSites.splice(index, 1);
  return true;
}

export async function listAttendance() {
  return mockDb.attendance;
}

export async function punchAttendance(payload: {
  employeeId: string;
  attendanceDate: string;
  punchType: "in" | "out";
  location?: string;
}) {
  const employeeName = mapEmployeeName(payload.employeeId) ?? "Unknown";
  const dateIso = safeDate(payload.attendanceDate);

  const existing = mockDb.attendance.find(
    (entry) =>
      entry.employeeId === payload.employeeId &&
      new Date(entry.attendanceDate).toDateString() === new Date(dateIso).toDateString(),
  );

  if (payload.punchType === "in") {
    if (existing) {
      existing.punchIn = new Date().toISOString();
      existing.punchInLocation = payload.location;
      return existing;
    }

    const record: AttendanceRecord = {
      id: mockDb.id("att"),
      employeeId: payload.employeeId,
      employeeName,
      attendanceDate: dateIso,
      punchIn: new Date().toISOString(),
      punchInLocation: payload.location,
      status: "present",
    };
    mockDb.attendance.unshift(record);
    return record;
  }

  if (!existing) {
    const fallback: AttendanceRecord = {
      id: mockDb.id("att"),
      employeeId: payload.employeeId,
      employeeName,
      attendanceDate: dateIso,
      punchOut: new Date().toISOString(),
      punchOutLocation: payload.location,
      status: "present",
    };
    mockDb.attendance.unshift(fallback);
    return fallback;
  }

  existing.punchOut = new Date().toISOString();
  existing.punchOutLocation = payload.location;
  if (existing.punchIn) {
    const minutes = Math.max(
      0,
      Math.round((new Date(existing.punchOut).getTime() - new Date(existing.punchIn).getTime()) / 60000),
    );
    existing.workingMinutes = minutes;
  }

  return existing;
}

export async function listExpenses() {
  return mockDb.expenses;
}

export async function createExpense(input: Omit<ExpenseRecord, "id" | "employeeName" | "siteName">) {
  const record: ExpenseRecord = {
    ...input,
    id: mockDb.id("exp"),
    employeeName: mapEmployeeName(input.employeeId),
    siteName: mockDb.atmSites.find((site) => site.id === input.atmSiteId)?.siteName,
  };

  mockDb.expenses.unshift(record);
  return record;
}

export async function listSalaryRecords(employeeId?: string) {
  if (!employeeId) return mockDb.salaryRecords;
  return mockDb.salaryRecords.filter((record) => record.employeeId === employeeId);
}

export async function createSalaryRecord(input: Omit<SalaryRecord, "id" | "employeeName" | "netSalary" | "updatedAt">) {
  const record: SalaryRecord = {
    ...input,
    id: mockDb.id("sal"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    netSalary: input.baseSalary + input.adjustment,
    updatedAt: new Date().toISOString(),
  };
  mockDb.salaryRecords.unshift(record);
  return record;
}

export async function updateSalaryRecord(id: string, patch: Partial<SalaryRecord>) {
  const index = mockDb.salaryRecords.findIndex((record) => record.id === id);
  if (index < 0) return null;

  const current = mockDb.salaryRecords[index];
  const nextEmployeeId = patch.employeeId ?? current.employeeId;
  const nextBase = patch.baseSalary ?? current.baseSalary;
  const nextAdjustment = patch.adjustment ?? current.adjustment;
  const merged: SalaryRecord = {
    ...current,
    ...patch,
    employeeId: nextEmployeeId,
    employeeName: mapEmployeeName(nextEmployeeId) ?? current.employeeName,
    netSalary: nextBase + nextAdjustment,
    updatedAt: new Date().toISOString(),
  };

  mockDb.salaryRecords[index] = merged;
  return merged;
}

export async function listAdvanceRequests(employeeId?: string) {
  if (!employeeId) return mockDb.advanceRequests;
  return mockDb.advanceRequests.filter((record) => record.employeeId === employeeId);
}

export async function createAdvanceRequest(
  input: Omit<AdvanceRequestRecord, "id" | "employeeName" | "reviewedAt" | "reviewedBy">,
) {
  const record: AdvanceRequestRecord = {
    ...input,
    id: mockDb.id("adv"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    requestDate: safeDate(input.requestDate),
    status: "pending",
  };

  mockDb.advanceRequests.unshift(record);
  return record;
}

export async function updateAdvanceRequest(id: string, patch: Partial<AdvanceRequestRecord>) {
  const index = mockDb.advanceRequests.findIndex((record) => record.id === id);
  if (index < 0) return null;

  const current = mockDb.advanceRequests[index];
  const nextEmployeeId = patch.employeeId ?? current.employeeId;
  const merged: AdvanceRequestRecord = {
    ...current,
    ...patch,
    employeeId: nextEmployeeId,
    employeeName: mapEmployeeName(nextEmployeeId) ?? current.employeeName,
  };

  mockDb.advanceRequests[index] = merged;
  return merged;
}

export async function listLeaveRequests(employeeId?: string) {
  if (!employeeId) return mockDb.leaveRequests;
  return mockDb.leaveRequests.filter((record) => record.employeeId === employeeId);
}

export async function createLeaveRequest(input: Omit<LeaveRequestRecord, "id" | "employeeName" | "totalDays">) {
  const fromDate = safeDate(input.fromDate);
  const toDate = safeDate(input.toDate);
  const record: LeaveRequestRecord = {
    ...input,
    id: mockDb.id("leave"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    fromDate,
    toDate,
    totalDays: daysBetweenInclusive(fromDate, toDate),
    status: "pending",
  };

  mockDb.leaveRequests.unshift(record);
  return record;
}

export async function updateLeaveRequest(id: string, patch: Partial<LeaveRequestRecord>) {
  const index = mockDb.leaveRequests.findIndex((record) => record.id === id);
  if (index < 0) return null;

  const current = mockDb.leaveRequests[index];
  const nextEmployeeId = patch.employeeId ?? current.employeeId;
  const nextFrom = patch.fromDate ? safeDate(patch.fromDate) : current.fromDate;
  const nextTo = patch.toDate ? safeDate(patch.toDate) : current.toDate;
  const merged: LeaveRequestRecord = {
    ...current,
    ...patch,
    employeeId: nextEmployeeId,
    employeeName: mapEmployeeName(nextEmployeeId) ?? current.employeeName,
    fromDate: nextFrom,
    toDate: nextTo,
    totalDays: daysBetweenInclusive(nextFrom, nextTo),
  };

  mockDb.leaveRequests[index] = merged;
  return merged;
}

export async function listFlmTasks(employeeId?: string) {
  if (!employeeId) return mockDb.flmTasks;
  return mockDb.flmTasks.filter((record) => record.employeeId === employeeId);
}

export async function createFlmTask(input: Omit<FlmTaskRecord, "id" | "employeeName">) {
  const record: FlmTaskRecord = {
    ...input,
    id: mockDb.id("flm"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    taskDate: safeDate(input.taskDate),
  };

  mockDb.flmTasks.unshift(record);
  return record;
}

export async function listSiteVisits() {
  return mockDb.visits;
}

export async function createSiteVisit(input: Omit<SiteVisitRecord, "id" | "employeeName" | "siteName">) {
  const record: SiteVisitRecord = {
    ...input,
    id: mockDb.id("visit"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    siteName: mockDb.atmSites.find((site) => site.id === input.atmSiteId)?.siteName ?? "Unknown site",
    visitedAt: safeDate(input.visitedAt),
  };

  mockDb.visits.unshift(record);
  if (record.status === "pending") {
    mockDb.notifications.unshift({
      id: mockDb.id("not"),
      title: `Pending issue at ${record.siteName}`,
      message: `${record.issueType.replace("_", " ")} reported by ${record.employeeName}.`,
      type: "issue",
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  }

  return record;
}

export async function listRetailers() {
  return mockDb.retailers;
}

export async function createRetailer(input: Omit<RetailerRecord, "id">) {
  const record: RetailerRecord = {
    ...input,
    id: mockDb.id("ret"),
  };
  mockDb.retailers.unshift(record);
  return record;
}

export async function listRetailVisits() {
  return mockDb.retailVisits.map((visit) => ({
    ...visit,
    proofStatus: visit.proofStatus ?? (visit.presenceProof?.locationVerified ? "verified" : "unverified"),
  }));
}

export async function createRetailVisit(
  input: Omit<RetailVisitRecord, "id" | "employeeName" | "shopName" | "proofStatus">,
) {
  const normalizedPhotoUrls =
    input.photoUrls.length > 0
      ? input.photoUrls
      : input.presenceProof?.photoUrl
        ? [input.presenceProof.photoUrl]
        : [];
  const proofStatus = input.presenceProof?.locationVerified ? "verified" : "unverified";

  const record: RetailVisitRecord = {
    ...input,
    photoUrls: normalizedPhotoUrls,
    id: mockDb.id("rv"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    shopName: mockDb.retailers.find((retailer) => retailer.id === input.retailerId)?.shopName ?? "Unknown",
    visitDate: safeDate(input.visitDate),
    proofStatus,
  };
  mockDb.retailVisits.unshift(record);

  if (record.proofStatus !== "verified") {
    mockDb.notifications.unshift({
      id: mockDb.id("not"),
      title: "Unverified retail visit",
      message: `${record.employeeName} submitted a visit at ${record.shopName} without valid live location proof.`,
      type: "system",
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  }

  return record;
}

export async function listOrders() {
  return mockDb.orders;
}

export async function createOrder(input: Omit<OrderRecord, "id" | "employeeName" | "shopName">) {
  const record: OrderRecord = {
    ...input,
    id: mockDb.id("ord"),
    employeeName: mapEmployeeName(input.employeeId),
    shopName: mockDb.retailers.find((retailer) => retailer.id === input.retailerId)?.shopName ?? "Unknown",
    followUpDate: input.followUpDate ? safeDate(input.followUpDate) : undefined,
  };
  mockDb.orders.unshift(record);
  if (record.followUpDate) {
    mockDb.notifications.unshift({
      id: mockDb.id("not"),
      title: "Follow-up scheduled",
      message: `${record.shopName} follow-up with ${record.metPersonName} set for ${new Date(record.followUpDate).toLocaleDateString("en-IN")}.`,
      type: "follow_up",
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  }
  return record;
}

export async function listNotifications() {
  return mockDb.notifications;
}

export async function createNotification(input: Omit<NotificationRecord, "id" | "isRead" | "createdAt">) {
  const record: NotificationRecord = {
    ...input,
    id: mockDb.id("not"),
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  mockDb.notifications.unshift(record);
  return record;
}

export async function markNotificationRead(id: string) {
  const notification = mockDb.notifications.find((entry) => entry.id === id);
  if (!notification) {
    return null;
  }

  notification.isRead = true;
  return notification;
}

export async function getReportsData() {
  const metrics: DashboardMetrics = mockDb.metricSnapshot();

  const expenseByEmployee = mockDb.expenses.reduce<Record<string, number>>((acc, item) => {
    const key = item.employeeName ?? "Unassigned";
    acc[key] = (acc[key] ?? 0) + item.amount;
    return acc;
  }, {});

  const visitsByEmployee = mockDb.visits.reduce<Record<string, number>>((acc, item) => {
    acc[item.employeeName] = (acc[item.employeeName] ?? 0) + 1;
    return acc;
  }, {});

  const orderStatus = mockDb.orders.reduce<Record<string, number>>((acc, item) => {
    acc[item.orderStatus] = (acc[item.orderStatus] ?? 0) + 1;
    return acc;
  }, {});

  return {
    metrics,
    expenseByEmployee: Object.entries(expenseByEmployee).map(([name, value]) => ({ name, value })),
    visitsByEmployee: Object.entries(visitsByEmployee).map(([name, value]) => ({ name, value })),
    orderStatus: Object.entries(orderStatus).map(([name, value]) => ({ name, value })),
    monthlyTrend: [
      { month: "Jan", expenses: 23000, visits: 40, orders: 18 },
      { month: "Feb", expenses: 19800, visits: 37, orders: 20 },
      { month: "Mar", expenses: 24200, visits: 45, orders: 24 },
      { month: "Apr", expenses: metrics.monthlyExpenses, visits: metrics.retailVisits, orders: metrics.ordersBooked },
    ],
  };
}

export async function getSettings() {
  return {
    companyName: "Sai Associates",
    timezone: "Asia/Kolkata",
    brandColor: "#0E7490",
    autoReminders: true,
    otpProvider: env.otpDevFallback ? "Dev Fallback" : "SMS Provider",
  };
}
