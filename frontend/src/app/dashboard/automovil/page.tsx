import { getAllAutomoviles } from "@apis/automovil";
import { ModalCreateAuto } from "@automovil/modal";
import { columnsAutomovil } from "@automovil/table/columns";
import { DataTableAutomovil } from "@automovil/table/data-table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AutomovilPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/auth/login');
  }

  const automoviles = await getAllAutomoviles(myCookie.value);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Automovil"
            subTitle="Gestiona los automóviles"
          />
        </div>
        <div>
          <ModalCreateAuto />
        </div>
      </div>

      <DataTableAutomovil columns={columnsAutomovil} data={automoviles}/>
    </div>
  );
}