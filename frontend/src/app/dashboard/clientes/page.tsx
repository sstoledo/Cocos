import { DataTable, Title } from "@/components";
import { Clients, columns } from "@/components/clients/columns";
import { getClients } from "@/helpers";
import { cookies } from "next/headers";


export default async function ClientsPage() {

  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const clients = await getClients(myCookie?.value!);

  const clientsPlain = clients.map(client=>({
    id:client.id,
    name: client.name,
    apat: client.apat,
    dni: client.dni,
    phone: client.phone
  }));


  return (

    <div className="container mx-auto">

      <Title
        title="Mis clientes"
      />

      <DataTable columns={columns} data={clientsPlain} />
    </div>
  );
  
}