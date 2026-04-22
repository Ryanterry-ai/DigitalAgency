export type Role = "admin" | "employee";
export type ActiveStatus = "active" | "inactive";
export type IssueStatus = "pending" | "resolved";
export type IssueType =
  | "down"
  | "dispenser_problem"
  | "cash_issue"
  | "network_issue"
  | "power_issue"
  | "other";
export type ExpenseType = "salary" | "advance" | "petrol" | "maintenance" | "other";
export type OrderStatus = "new" | "confirmed" | "delivered" | "canceled";

export type UserSession = {
  id: string;
  mobile: string;
  role: Role;
  employeeId?: string;
  name?: string;
};

export type EmployeeRecord = {
  id: string;
  employeeCode: string;
  fullName: string;
  email?: string;
  mobile: string;
  location?: string;
  joiningDate?: string;
  status: ActiveStatus;
};

export type AtmSiteRecord = {
  id: string;
  siteName: string;
  siteCode: string;
  address: string;
  city: string;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  status: ActiveStatus;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  attendanceDate: string;
  punchIn?: string;
  punchOut?: string;
  punchInLocation?: string;
  punchOutLocation?: string;
  workingMinutes?: number;
  status: "present" | "absent" | "half_day";
};

export type ExpenseRecord = {
  id: string;
  employeeId?: string;
  employeeName?: string;
  atmSiteId?: string;
  siteName?: string;
  expenseType: ExpenseType;
  amount: number;
  expenseDate: string;
  notes?: string;
  proofUrl?: string;
};

export type SiteVisitRecord = {
  id: string;
  atmSiteId: string;
  siteName: string;
  employeeId: string;
  employeeName: string;
  issueType: IssueType;
  expenseAmount: number;
  notes?: string;
  photoUrl: string;
  status: IssueStatus;
  visitedAt: string;
};

export type RetailerRecord = {
  id: string;
  shopName: string;
  ownerName: string;
  mobile: string;
  address: string;
};

export type RetailPresenceProof = {
  photoUrl: string;
  capturedAt: string;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  captureMethod: "camera_capture" | "file_upload";
  locationVerified: boolean;
};

export type RetailVisitRecord = {
  id: string;
  retailerId: string;
  shopName: string;
  employeeId: string;
  employeeName: string;
  visitDate: string;
  visitTime: string;
  notes?: string;
  photoUrls: string[];
  presenceProof?: RetailPresenceProof;
  proofStatus: "verified" | "unverified";
};

export type OrderRecord = {
  id: string;
  retailerId: string;
  shopName: string;
  employeeId?: string;
  employeeName?: string;
  metPersonName: string;
  metPersonMobile: string;
  productName: string;
  quantity: number;
  followUpDate?: string;
  orderStatus: OrderStatus;
  notes?: string;
};

export type NotificationRecord = {
  id: string;
  title: string;
  message: string;
  type: "issue" | "follow_up" | "expense" | "attendance" | "system";
  isRead: boolean;
  createdAt: string;
};

export type DashboardMetrics = {
  totalAtmSites: number;
  pendingIssues: number;
  resolvedIssues: number;
  todaysAttendance: number;
  monthlyExpenses: number;
  retailVisits: number;
  ordersBooked: number;
  pendingFollowUps: number;
};
