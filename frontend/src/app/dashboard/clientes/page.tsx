
import { getClients } from "@apis/clients";
import { columns, DataTable } from "@clients/data-table";
import { ModalCreateClient } from "@clients/modal";
import { Button } from "@ui/button";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import Link from "next/link";


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
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Mis clientes"
            subTitle="Gestiona tus clientes"
          />
        </div>
        <div>
          <ModalCreateClient />
        </div>
      </div>

      <DataTable columns={columns} data={clientsPlain} />
    </div>
  );

}