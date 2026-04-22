import { ResourceModule } from "@/components/modules/resource-module";
import { listEmployees, listRetailers } from "@/server/services/data.service";

export default async function RetailVisitsPage() {
  const [employees, retailers] = await Promise.all([listEmployees(), listRetailers()]);

  return (
    <ResourceModule
      title="Retail Visit Tracking"
      description="Capture retailer meeting details, field notes, and photo attachments."
      endpoint="/api/retail/visits"
      fields={[
        {
          name: "retailerId",
          label: "Shop",
          type: "select",
          required: true,
          options: retailers.map((retailer) => ({ label: retailer.shopName, value: retailer.id })),
        },
        {
          name: "employeeId",
          label: "Employee",
          type: "select",
          required: true,
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        { name: "visitDate", label: "Visit Date", type: "date", required: true },
        { name: "visitTime", label: "Visit Time", required: true },
        { name: "photoUrl", label: "Photo", type: "file" },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { key: "shopName", header: "Shop" },
        { key: "employeeName", header: "Employee" },
        { key: "visitDate", header: "Date" },
        { key: "visitTime", header: "Time" },
        { key: "notes", header: "Notes" },
      ]}
    />
  );
}
