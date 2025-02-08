import { getAllProviders } from "@apis/providers";
import { ModalCreateProvider } from "@provider/modal";
import { columnsProvider, DataTableProvider } from "@provider/table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";

export default async function ProveedoresPage() {

  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');
  const proveedores = await getAllProviders(myCookie?.value!);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Mis proveedores" subTitle="Gestiona tus proveedores"
          />
        </div>
        <div>
          <ModalCreateProvider />
        </div>
      </div>

      <DataTableProvider columns={columnsProvider} data={proveedores} />
    </div>
  );
}