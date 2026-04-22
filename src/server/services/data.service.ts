import crypto from "node:crypto";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import {
  AtmSiteRecord,
  AttendanceRecord,
  DashboardMetrics,
  EmployeeRecord,
  ExpenseRecord,
  NotificationRecord,
  OrderRecord,
  RetailerRecord,
  RetailVisitRecord,
  SiteVisitRecord,
  UserSession,
} from "@/types/entities";
import { mockDb } from "@/server/store/mock-db";

const usingMock = env.isPreviewMode;

const hashOtp = (code: string) => crypto.createHash("sha256").update(code).digest("hex");
const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const safeDate = (value?: string) => (value ? new Date(value).toISOString() : new Date().toISOString());

const mapEmployeeName = (employeeId?: string) =>
  mockDb.employees.find((employee) => employee.id === employeeId)?.fullName;

export async function requestOtp(mobile: string) {
  const cleanMobile = mobile.trim();
  let user = mockDb.users.get(cleanMobile);

  if (!user) {
    const employee = mockDb.employees.find((entry) => entry.mobile === cleanMobile);
    user = {
      id: mockDb.id("usr"),
      mobile: cleanMobile,
      role: employee ? "employee" : "employee",
      employeeId: employee?.id,
      name: employee?.fullName ?? "Field Employee",
    };
    mockDb.users.set(cleanMobile, user);
  }

  const existingOtp = mockDb.otpStore.get(cleanMobile);
  if (existingOtp && existingOtp.expiresAt > Date.now()) {
    return {
      ok: false as const,
      expiresAt: existingOtp.expiresAt,
      remainingSeconds: Math.ceil((existingOtp.expiresAt - Date.now()) / 1000),
    };
  }

  const code = env.otpDevFallback ? "123456" : generateOtp();
  const expiresAt = Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000;
  mockDb.otpStore.set(cleanMobile, {
    codeHash: hashOtp(code),
    expiresAt,
    attempts: 0,
  });

  if (!usingMock) {
    try {
      const dbUser = await prisma.user.upsert({
        where: { mobile: cleanMobile },
        update: {},
        create: { mobile: cleanMobile, role: user.role },
      });

      await prisma.otpToken.create({
        data: {
          userId: dbUser.id,
          codeHash: hashOtp(code),
          expiresAt: new Date(expiresAt),
        },
      });
    } catch {
      // Keep login flow alive in preview mode if DB is unavailable.
    }
  }

  return {
    ok: true as const,
    expiresAt,
    devCode: env.otpDevFallback ? code : undefined,
  };
}

export async function verifyOtp(mobile: string, code: string): Promise<UserSession | null> {
  const cleanMobile = mobile.trim();

  const otp = mockDb.otpStore.get(cleanMobile);
  if (!otp) {
    return null;
  }

  if (otp.expiresAt < Date.now()) {
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

  return {
    metrics,
    issueTrend,
    retailTrend,
    expenseByType,
    recentNotifications: mockDb.notifications.slice(0, 6),
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

export async function createEmployee(input: Omit<EmployeeRecord, "id">) {
  const record: EmployeeRecord = {
    ...input,
    id: mockDb.id("emp"),
  };
  mockDb.employees.unshift(record);
  return record;
}

export async function updateEmployee(id: string, patch: Partial<EmployeeRecord>) {
  const index = mockDb.employees.findIndex((employee) => employee.id === id);
  if (index < 0) return null;

  mockDb.employees[index] = { ...mockDb.employees[index], ...patch };
  return mockDb.employees[index];
}

export async function deleteEmployee(id: string) {
  const index = mockDb.employees.findIndex((employee) => employee.id === id);
  if (index < 0) return false;
  mockDb.employees.splice(index, 1);
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
  return mockDb.retailVisits;
}

export async function createRetailVisit(input: Omit<RetailVisitRecord, "id" | "employeeName" | "shopName">) {
  const record: RetailVisitRecord = {
    ...input,
    id: mockDb.id("rv"),
    employeeName: mapEmployeeName(input.employeeId) ?? "Unknown",
    shopName: mockDb.retailers.find((retailer) => retailer.id === input.retailerId)?.shopName ?? "Unknown",
    visitDate: safeDate(input.visitDate),
  };
  mockDb.retailVisits.unshift(record);
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
      message: `${record.shopName} follow-up set for ${new Date(record.followUpDate).toLocaleDateString("en-IN")}.`,
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
