import { ResourceModule } from "@/components/modules/resource-module";

export default function RetailersPage() {
  return (
    <ResourceModule
      title="Retailer Directory"
      description="Track all retailer stores, owner contacts, and territory coverage."
      endpoint="/api/retail/retailers"
      fields={[
        { name: "shopName", label: "Shop Name", required: true },
        { name: "ownerName", label: "Owner Name", required: true },
        { name: "mobile", label: "Mobile", required: true },
        { name: "address", label: "Address", required: true },
      ]}
      columns={[
        { key: "shopName", header: "Shop" },
        { key: "ownerName", header: "Owner" },
        { key: "mobile", header: "Mobile" },
        { key: "address", header: "Address" },
      ]}
    />
  );
}
