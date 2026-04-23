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

const now = new Date();

const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const employees: EmployeeRecord[] = [
  {
    id: "emp_admin",
    employeeCode: "SAI-ADM-001",
    fullName: "Aman Sharma",
    email: "aman@saiassociates.in",
    mobile: "9876543210",
    category: "admin",
    location: "Mathura",
    joiningDate: "2023-04-04",
    status: "active",
  },
  {
    id: "emp_001",
    employeeCode: "SAI-EMP-101",
    fullName: "Rakesh Chahar",
    email: "rakesh@saiassociates.in",
    mobile: "9988776655",
    category: "atm",
    location: "Vrindavan",
    joiningDate: "2024-01-18",
    status: "active",
  },
  {
    id: "emp_002",
    employeeCode: "SAI-EMP-102",
    fullName: "Manish Chahar",
    email: "manish@saiassociates.in",
    mobile: "9123456780",
    category: "atm",
    location: "Agra",
    joiningDate: "2024-02-05",
    status: "active",
  },
  {
    id: "emp_003",
    employeeCode: "SAI-EMP-103",
    fullName: "Gulab Singh",
    email: "gulab@saiassociates.in",
    mobile: "8865056535",
    category: "atm",
    location: "Mathura",
    joiningDate: "2024-03-12",
    status: "active",
  },
  {
    id: "emp_004",
    employeeCode: "SAI-EMP-104",
    fullName: "Akash Dara",
    email: "akash@saiassociates.in",
    mobile: "9011111104",
    category: "atm",
    location: "Mathura",
    joiningDate: "2024-04-01",
    status: "active",
  },
  {
    id: "emp_005",
    employeeCode: "SAI-EMP-105",
    fullName: "Shubham Gola",
    email: "shubham@saiassociates.in",
    mobile: "9011111105",
    category: "crompton",
    location: "Agra",
    joiningDate: "2024-04-08",
    status: "active",
  },
  {
    id: "emp_006",
    employeeCode: "SAI-EMP-106",
    fullName: "Dhruv",
    email: "dhruv@saiassociates.in",
    mobile: "9011111106",
    category: "crompton",
    location: "Bharatpur",
    joiningDate: "2024-04-14",
    status: "active",
  },
  {
    id: "emp_007",
    employeeCode: "SAI-EMP-107",
    fullName: "Gajendra Singh",
    email: "gajendra@saiassociates.in",
    mobile: "9011111107",
    category: "atm",
    location: "Mathura",
    joiningDate: "2024-04-20",
    status: "active",
  },
  {
    id: "emp_008",
    employeeCode: "SAI-EMP-108",
    fullName: "Utkarsh",
    email: "utkarsh@saiassociates.in",
    mobile: "9011111108",
    category: "crompton",
    location: "Agra",
    joiningDate: "2024-04-21",
    status: "active",
  },
  {
    id: "emp_009",
    employeeCode: "SAI-EMP-109",
    fullName: "Bhanu Sharma",
    email: "bhanu@saiassociates.in",
    mobile: "9011111109",
    category: "atm",
    location: "Vrindavan",
    joiningDate: "2024-04-22",
    status: "active",
  },
  {
    id: "emp_010",
    employeeCode: "SAI-EMP-110",
    fullName: "Mukesh Sharma",
    email: "mukesh@saiassociates.in",
    mobile: "9011111110",
    category: "crompton",
    location: "Mathura",
    joiningDate: "2024-04-23",
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
    assignedEmployeeName: "Rakesh Chahar",
    status: "active",
  },
  {
    id: "site_002",
    siteName: "PNB Market ATM",
    siteCode: "ATM-PNB-203",
    address: "Krishna Market",
    city: "Vrindavan",
    assignedEmployeeId: "emp_002",
    assignedEmployeeName: "Manish Chahar",
    status: "active",
  },
];

const attendance: AttendanceRecord[] = [
  {
    id: "att_001",
    employeeId: "emp_001",
    employeeName: "Rakesh Chahar",
    attendanceDate: now.toISOString(),
    punchIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 12).toISOString(),
    status: "present",
  },
  {
    id: "att_002",
    employeeId: "emp_002",
    employeeName: "Manish Chahar",
    attendanceDate: now.toISOString(),
    punchIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 4).toISOString(),
    status: "present",
  },
];

const expenses: ExpenseRecord[] = [
  {
    id: "exp_001",
    employeeId: "emp_001",
    employeeName: "Rakesh Chahar",
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
    employeeName: "Manish Chahar",
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
    employeeName: "Rakesh Chahar",
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
    employeeName: "Manish Chahar",
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
    employeeId: "emp_005",
    employeeName: "Shubham Gola",
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
    employeeId: "emp_005",
    employeeName: "Shubham Gola",
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
    employeeName: "Rakesh Chahar",
    metPersonName: "Amit Goyal",
    metPersonMobile: "9877003344",
    productName: "Crompton LED Driver 24W",
    quantity: 20,
    followUpDate: new Date(now.getTime() + 1 * 24 * 3600000).toISOString(),
    orderStatus: "new",
    notes: "Price confirmation pending",
  },
];

const salaryRecords: SalaryRecord[] = [
  {
    id: "sal_001",
    employeeId: "emp_001",
    employeeName: "Rakesh Chahar",
    month: "2026-04",
    baseSalary: 22000,
    adjustment: 1500,
    netSalary: 23500,
    status: "paid",
    remarks: "Route completion bonus",
    updatedAt: now.toISOString(),
  },
  {
    id: "sal_002",
    employeeId: "emp_005",
    employeeName: "Shubham Gola",
    month: "2026-04",
    baseSalary: 21000,
    adjustment: 0,
    netSalary: 21000,
    status: "pending",
    remarks: "Awaiting month closure",
    updatedAt: now.toISOString(),
  },
];

const advanceRequests: AdvanceRequestRecord[] = [
  {
    id: "adv_001",
    employeeId: "emp_003",
    employeeName: "Gulab Singh",
    requestDate: now.toISOString(),
    amount: 3000,
    reason: "Emergency household medical expense",
    status: "pending",
  },
];

const leaveRequests: LeaveRequestRecord[] = [
  {
    id: "leave_001",
    employeeId: "emp_002",
    employeeName: "Manish Chahar",
    leaveType: "casual",
    fromDate: now.toISOString(),
    toDate: new Date(now.getTime() + 2 * 24 * 3600000).toISOString(),
    totalDays: 3,
    reason: "Family function",
    status: "approved",
  },
];

const flmTasks: FlmTaskRecord[] = [
  {
    id: "flm_001",
    employeeId: "emp_001",
    employeeName: "Rakesh Chahar",
    taskDate: now.toISOString(),
    taskTitle: "Cash cassette health check",
    siteOrArea: "SBI Highway ATM",
    status: "in_progress",
    notes: "Vendor ETA 2 PM",
  },
  {
    id: "flm_002",
    employeeId: "emp_005",
    employeeName: "Shubham Gola",
    taskDate: now.toISOString(),
    taskTitle: "Retail route closure and order recap",
    siteOrArea: "Mathura market cluster",
    status: "pending",
    notes: "Need owner signoff",
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
    { id: "usr_emp_1", mobile: "9988776655", role: "employee", employeeId: "emp_001", name: "Rakesh Chahar" },
  ],
  [
    "9123456780",
    { id: "usr_emp_2", mobile: "9123456780", role: "employee", employeeId: "emp_002", name: "Manish Chahar" },
  ],
  [
    "8865056535",
    { id: "usr_emp_3", mobile: "8865056535", role: "employee", employeeId: "emp_003", name: "Gulab Singh" },
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
  salaryRecords,
  advanceRequests,
  leaveRequests,
  flmTasks,
  notifications,
  metricSnapshot,
};
