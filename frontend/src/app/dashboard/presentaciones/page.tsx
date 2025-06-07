import { getPresentacion } from "@apis/presentacion";
import { ModalCreatePresentacion } from "@presentacion/modal";
import { columnsPresentacion, DataTablePresentacion } from "@presentacion/table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function PresentacionesPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/auth/login');
  }

  const presentaciones = await getPresentacion(myCookie.value);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Mis presentaciones" subTitle="Gestiona tus presentaciones"
          />
        </div>
        <div>
          <ModalCreatePresentacion />
        </div>
      </div>

      <DataTablePresentacion columns={columnsPresentacion} data={presentaciones} />
    </div>
  );
}