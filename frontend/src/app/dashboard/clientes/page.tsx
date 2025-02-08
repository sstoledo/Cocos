
import { getClients } from "@apis/clients";
import { columns, DataTable } from "@clients/data-table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";


export default async function ClientsPage() {

  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  const clients = await getClients(myCookie?.value!);

  const clientsPlain = clients.map(client => ({
    id: client.id,
    name: client.name,
    apat: client.apat,
    dni: client.dni,
    phone: client.phone
  }));


  return (

    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <Title
        title="Mis clientes"
      />

      <DataTable columns={columns} data={clientsPlain} />
    </div>
  );

}