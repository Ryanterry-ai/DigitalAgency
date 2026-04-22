import { z } from "zod";

export const loginSchema = z.object({
  mobile: z.string().min(10).max(15),
});

export const verifyOtpSchema = z.object({
  mobile: z.string().min(10).max(15),
  code: z.string().length(6),
});

export const employeeSchema = z.object({
  employeeCode: z.string().min(2),
  fullName: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  mobile: z.string().min(10),
  location: z.string().optional(),
  joiningDate: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const atmSiteSchema = z.object({
  siteName: z.string().min(2),
  siteCode: z.string().min(2),
  address: z.string().min(4),
  city: z.string().min(2),
  assignedEmployeeId: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const attendanceSchema = z.object({
  employeeId: z.string().min(1),
  attendanceDate: z.string().min(4),
  punchType: z.enum(["in", "out"]),
  location: z.string().optional(),
});

export const expenseSchema = z.object({
  employeeId: z.string().optional(),
  atmSiteId: z.string().optional(),
  expenseType: z.enum(["salary", "advance", "petrol", "maintenance", "other"]),
  amount: z.coerce.number().positive(),
  expenseDate: z.string(),
  notes: z.string().optional(),
  proofUrl: z.string().optional(),
});

export const siteVisitSchema = z.object({
  atmSiteId: z.string().min(1),
  employeeId: z.string().min(1),
  issueType: z.enum([
    "down",
    "dispenser_problem",
    "cash_issue",
    "network_issue",
    "power_issue",
    "other",
  ]),
  expenseAmount: z.coerce.number().min(0),
  notes: z.string().optional(),
  photoUrl: z.string().min(2),
  status: z.enum(["pending", "resolved"]),
  visitedAt: z.string(),
});

export const retailerSchema = z.object({
  shopName: z.string().min(2),
  ownerName: z.string().min(2),
  mobile: z.string().min(10),
  address: z.string().min(4),
});

export const retailVisitSchema = z.object({
  retailerId: z.string().min(1),
  employeeId: z.string().min(1),
  visitDate: z.string(),
  visitTime: z.string().min(1),
  notes: z.string().optional(),
  photoUrls: z.array(z.string()).default([]),
});

export const orderSchema = z.object({
  retailerId: z.string().min(1),
  employeeId: z.string().optional(),
  productName: z.string().min(2),
  quantity: z.coerce.number().int().positive(),
  followUpDate: z.string().optional(),
  orderStatus: z.enum(["new", "confirmed", "delivered", "canceled"]),
  notes: z.string().optional(),
});

export const notificationSchema = z.object({
  title: z.string().min(2),
  message: z.string().min(2),
  type: z.enum(["issue", "follow_up", "expense", "attendance", "system"]),
});
