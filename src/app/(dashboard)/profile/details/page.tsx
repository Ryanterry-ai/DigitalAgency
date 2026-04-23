import { getCurrentSession } from "@/lib/auth/current-user";
import { getEmployeeById } from "@/server/services/data.service";

import { ProfileDetailsClient } from "./profile-details-client";

export default async function ProfileDetailsPage() {
  const session = await getCurrentSession();
  const employee = await getEmployeeById(session?.employeeId);

  return <ProfileDetailsClient session={session} employee={employee} />;
}
