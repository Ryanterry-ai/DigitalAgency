import { Role } from "@/types/entities";

const adminOnlyRoutes = ["/employees", "/reports", "/settings"];

export function canAccessRoute(role: Role, pathname: string) {
  if (role === "admin") {
    return true;
  }

  return !adminOnlyRoutes.some((route) => pathname.startsWith(route));
}

export function assertRole(role: Role, allowed: Role[]) {
  if (!allowed.includes(role)) {
    throw new Error("Forbidden");
  }
}
