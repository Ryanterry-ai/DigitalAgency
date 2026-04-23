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
  completeAddress: z.string().min(10),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN format must be ABCDE1234F"),
  photoUrl: z.string().min(4),
  category: z.enum(["admin", "atm", "crompton"]).default("atm"),
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

const retailPresenceProofSchema = z.object({
  photoUrl: z.string().url(),
  capturedAt: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracyMeters: z.number().min(0).optional(),
  captureMethod: z.enum(["camera_capture", "file_upload"]),
  locationVerified: z.boolean(),
});

export const retailVisitSchema = z
  .object({
    retailerId: z.string().min(1),
    employeeId: z.string().min(1),
    visitDate: z.string(),
    visitTime: z.string().min(1),
    notes: z.string().optional(),
    photoUrls: z.array(z.string().url()).default([]),
    presenceProof: retailPresenceProofSchema.optional(),
  })
  .superRefine((value, ctx) => {
    const hasProofPhoto = value.photoUrls.length > 0;
    const hasPresence = Boolean(value.presenceProof?.locationVerified);
    if (!hasProofPhoto || !hasPresence) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Live photo with verified location is required to submit a retail visit.",
        path: ["presenceProof"],
      });
    }
  });

export const orderSchema = z.object({
  retailerId: z.string().min(1),
  employeeId: z.string().optional(),
  metPersonName: z.string().min(2),
  metPersonMobile: z.string().min(10).max(15),
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

export const salarySchema = z.object({
  employeeId: z.string().min(1),
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  baseSalary: z.coerce.number().positive(),
  adjustment: z.coerce.number().default(0),
  status: z.enum(["pending", "paid", "hold"]).default("pending"),
  remarks: z.string().optional(),
});

export const advanceRequestSchema = z.object({
  employeeId: z.string().optional(),
  requestDate: z.string(),
  amount: z.coerce.number().positive(),
  reason: z.string().min(2),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export const leaveRequestSchema = z.object({
  employeeId: z.string().optional(),
  leaveType: z.enum(["casual", "sick", "emergency", "other"]),
  fromDate: z.string(),
  toDate: z.string(),
  reason: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export const flmTaskSchema = z.object({
  employeeId: z.string().optional(),
  taskDate: z.string(),
  taskTitle: z.string().min(2),
  siteOrArea: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]),
  notes: z.string().optional(),
});
