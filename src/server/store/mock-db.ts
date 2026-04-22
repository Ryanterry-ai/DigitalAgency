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

const now = new Date();

const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const employees: EmployeeRecord[] = [
  {
    id: "emp_admin",
    employeeCode: "SAI-ADM-001",
    fullName: "Aman Sharma",
    email: "aman@saiassociates.in",
    mobile: "9876543210",
    location: "Mathura",
    joiningDate: "2023-04-04",
    status: "active",
  },
  {
    id: "emp_001",
    employeeCode: "SAI-EMP-101",
    fullName: "Ravi Singh",
    email: "ravi@saiassociates.in",
    mobile: "9988776655",
    location: "Vrindavan",
    joiningDate: "2024-01-18",
    status: "active",
  },
  {
    id: "emp_002",
    employeeCode: "SAI-EMP-102",
    fullName: "Neha Verma",
    email: "neha@saiassociates.in",
    mobile: "9123456780",
    location: "Agra",
    joiningDate: "2024-02-05",
    status: "active",
  },
  {
    id: "emp_003",
    employeeCode: "SAI-EMP-103",
    fullName: "Arjun Khanna",
    email: "arjun@saiassociates.in",
    mobile: "8865056535",
    location: "Mathura",
    joiningDate: "2024-03-12",
    status: "active",
  },
];

const atmSites: AtmSiteRecord[] = [
  {
    id: "site_001",
    siteName: "SBI Highway ATM",
    siteCode: "ATM-SBI-101",
    address: "NH-2 Service Lane",
    city: "Mathura",
    assignedEmployeeId: "emp_001",
    assignedEmployeeName: "Ravi Singh",
    status: "active",
  },
  {
    id: "site_002",
    siteName: "PNB Market ATM",
    siteCode: "ATM-PNB-203",
    address: "Krishna Market",
    city: "Vrindavan",
    assignedEmployeeId: "emp_002",
    assignedEmployeeName: "Neha Verma",
    status: "active",
  },
];

const attendance: AttendanceRecord[] = [
  {
    id: "att_001",
    employeeId: "emp_001",
    employeeName: "Ravi Singh",
    attendanceDate: now.toISOString(),
    punchIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 12).toISOString(),
    status: "present",
  },
  {
    id: "att_002",
    employeeId: "emp_002",
    employeeName: "Neha Verma",
    attendanceDate: now.toISOString(),
    punchIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 4).toISOString(),
    status: "present",
  },
];

const expenses: ExpenseRecord[] = [
  {
    id: "exp_001",
    employeeId: "emp_001",
    employeeName: "Ravi Singh",
    atmSiteId: "site_001",
    siteName: "SBI Highway ATM",
    expenseType: "maintenance",
    amount: 1800,
    expenseDate: now.toISOString(),
    notes: "Cash tray roller replaced",
    proofUrl: "",
  },
  {
    id: "exp_002",
    employeeId: "emp_002",
    employeeName: "Neha Verma",
    atmSiteId: "site_002",
    siteName: "PNB Market ATM",
    expenseType: "petrol",
    amount: 620,
    expenseDate: now.toISOString(),
    notes: "Retail route visit",
    proofUrl: "",
  },
];

const visits: SiteVisitRecord[] = [
  {
    id: "visit_001",
    atmSiteId: "site_001",
    siteName: "SBI Highway ATM",
    employeeId: "emp_001",
    employeeName: "Ravi Singh",
    issueType: "network_issue",
    expenseAmount: 450,
    notes: "Restarted router and checked link",
    photoUrl: "https://images.unsplash.com/photo-1580997084782-8f7d7f65a4c4?auto=format&fit=crop&w=900&q=80",
    status: "resolved",
    visitedAt: now.toISOString(),
  },
  {
    id: "visit_002",
    atmSiteId: "site_002",
    siteName: "PNB Market ATM",
    employeeId: "emp_002",
    employeeName: "Neha Verma",
    issueType: "cash_issue",
    expenseAmount: 0,
    notes: "Cash vendor informed",
    photoUrl: "https://images.unsplash.com/photo-1529122312224-c87a9b4c08c8?auto=format&fit=crop&w=900&q=80",
    status: "pending",
    visitedAt: now.toISOString(),
  },
];

const retailers: RetailerRecord[] = [
  {
    id: "ret_001",
    shopName: "Shree Electricals",
    ownerName: "Mukesh Gupta",
    mobile: "9988001122",
    address: "Holi Gate, Mathura",
  },
  {
    id: "ret_002",
    shopName: "Goyal Traders",
    ownerName: "Amit Goyal",
    mobile: "9877003344",
    address: "Dampier Nagar, Mathura",
  },
];

const retailVisits: RetailVisitRecord[] = [
  {
    id: "rv_001",
    retailerId: "ret_001",
    shopName: "Shree Electricals",
    employeeId: "emp_002",
    employeeName: "Neha Verma",
    visitDate: now.toISOString(),
    visitTime: "11:15",
    notes: "Promoted new fan range",
    photoUrls: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
    ],
    presenceProof: {
      photoUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
      capturedAt: now.toISOString(),
      latitude: 27.4924,
      longitude: 77.6737,
      accuracyMeters: 18,
      captureMethod: "camera_capture",
      locationVerified: true,
    },
    proofStatus: "verified",
  },
];

const orders: OrderRecord[] = [
  {
    id: "ord_001",
    retailerId: "ret_001",
    shopName: "Shree Electricals",
    employeeId: "emp_002",
    employeeName: "Neha Verma",
    metPersonName: "Mukesh Gupta",
    metPersonMobile: "9988001122",
    productName: "Crompton Aura Prime 1200mm",
    quantity: 6,
    followUpDate: new Date(now.getTime() + 2 * 24 * 3600000).toISOString(),
    orderStatus: "confirmed",
    notes: "Need next dispatch batch",
  },
  {
    id: "ord_002",
    retailerId: "ret_002",
    shopName: "Goyal Traders",
    employeeId: "emp_001",
    employeeName: "Ravi Singh",
    metPersonName: "Amit Goyal",
    metPersonMobile: "9877003344",
    productName: "Crompton LED Driver 24W",
    quantity: 20,
    followUpDate: new Date(now.getTime() + 1 * 24 * 3600000).toISOString(),
    orderStatus: "new",
    notes: "Price confirmation pending",
  },
];

const notifications: NotificationRecord[] = [
  {
    id: "not_001",
    title: "Pending ATM issue",
    message: "PNB Market ATM cash issue is still pending.",
    type: "issue",
    isRead: false,
    createdAt: now.toISOString(),
  },
  {
    id: "not_002",
    title: "Follow-up due tomorrow",
    message: "Order follow-up for Goyal Traders is due tomorrow.",
    type: "follow_up",
    isRead: false,
    createdAt: now.toISOString(),
  },
];

const otpStore = new Map<string, { codeHash: string; expiresAt: number; attempts: number }>();

const users = new Map<string, UserSession>([
  [
    "9876543210",
    { id: "usr_admin", mobile: "9876543210", role: "admin", employeeId: "emp_admin", name: "Aman Sharma" },
  ],
  [
    "9988776655",
    { id: "usr_emp_1", mobile: "9988776655", role: "employee", employeeId: "emp_001", name: "Ravi Singh" },
  ],
  [
    "9123456780",
    { id: "usr_emp_2", mobile: "9123456780", role: "employee", employeeId: "emp_002", name: "Neha Verma" },
  ],
  [
    "8865056535",
    { id: "usr_emp_3", mobile: "8865056535", role: "employee", employeeId: "emp_003", name: "Arjun Khanna" },
  ],
]);

function metricSnapshot(): DashboardMetrics {
  const currentMonth = new Date().getMonth();

  return {
    totalAtmSites: atmSites.length,
    pendingIssues: visits.filter((v) => v.status === "pending").length,
    resolvedIssues: visits.filter((v) => v.status === "resolved").length,
    todaysAttendance: attendance.filter(
      (a) => new Date(a.attendanceDate).toDateString() === new Date().toDateString(),
    ).length,
    monthlyExpenses: expenses
      .filter((e) => new Date(e.expenseDate).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0),
    retailVisits: retailVisits.length,
    ordersBooked: orders.length,
    pendingFollowUps: orders.filter((o) => o.orderStatus === "new").length,
  };
}

export const mockDb = {
  id,
  users,
  otpStore,
  employees,
  atmSites,
  attendance,
  expenses,
  visits,
  retailers,
  retailVisits,
  orders,
  notifications,
  metricSnapshot,
};
