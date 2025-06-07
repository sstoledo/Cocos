import { getAllMarcas } from "@apis/marcas";
import { ModalCreateMarca } from "@marca/modal";
import { columnsMarca, DataTableMarca } from "@marca/table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";

export default async function MarcasPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  const marcas = await getAllMarcas(myCookie?.value!);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title 
            title="Mis marcas"
            subTitle="Gestiona tus marcas"
          />
        </div>
        <div>
          <ModalCreateMarca />
        </div>
      </div>

      <DataTableMarca columns={columnsMarca} data={marcas} />
    </div>
  );
}