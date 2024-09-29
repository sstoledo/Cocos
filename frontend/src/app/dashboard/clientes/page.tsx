import { DataTable, Title } from "@/components";
import { Clients, columns } from "@/components/clients/columns";

async function getData(): Promise<Clients[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function ClientsPage() {

  const data = await getData();

  return (

    <div className="container mx-auto">

      <Title
        title="Mis clientes"
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
  
}