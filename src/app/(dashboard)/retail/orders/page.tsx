import { ResourceModule } from "@/components/modules/resource-module";
import { listEmployees, listRetailers } from "@/server/services/data.service";

export default async function RetailOrdersPage() {
  const [employees, retailers] = await Promise.all([listEmployees(), listRetailers()]);

  return (
    <ResourceModule
      title="Orders & Follow-up Notes"
      description="Track booked orders, product quantities, follow-up commitments, and the person met at each retailer."
      endpoint="/api/retail/orders"
      fields={[
        {
          name: "retailerId",
          label: "Retailer",
          type: "select",
          required: true,
          options: retailers.map((retailer) => ({ label: retailer.shopName, value: retailer.id })),
        },
        {
          name: "employeeId",
          label: "Employee",
          type: "select",
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        { name: "productName", label: "Product", required: true },
        { name: "quantity", label: "Quantity", type: "number", required: true },
        { name: "metPersonName", label: "Person Met Name", required: true },
        { name: "metPersonMobile", label: "Person Met Mobile", required: true },
        { name: "followUpDate", label: "Follow-up Date", type: "date" },
        {
          name: "orderStatus",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "New", value: "new" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Delivered", value: "delivered" },
            { label: "Canceled", value: "canceled" },
          ],
        },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { key: "shopName", header: "Retailer" },
        { key: "productName", header: "Product" },
        { key: "quantity", header: "Qty" },
        { key: "employeeName", header: "Employee" },
        { key: "metPersonName", header: "Person Met" },
        { key: "metPersonMobile", header: "Mobile" },
        { key: "orderStatus", header: "Status" },
        { key: "followUpDate", header: "Follow-up" },
      ]}
    />
  );
}
