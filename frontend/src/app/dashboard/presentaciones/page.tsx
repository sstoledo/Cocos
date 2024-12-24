import { getPresentacion } from "@apis/presentacion";
import { ModalCreatePresentacion } from "@presentacion/modal";
import { columnsPresentacion, DataTablePresentacion } from "@presentacion/table";
import { Label } from "@ui/label";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";

export default async function PresentacionesPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  const presentaciones = await getPresentacion(myCookie?.value!);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4">
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