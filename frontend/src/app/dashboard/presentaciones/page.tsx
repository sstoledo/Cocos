import { Title } from "@/components";
import { ModalCreatePresentacion } from "@/components/presentacion/modal/ModalCreatePresentacion";
import { columnsPresentacion } from "@/components/presentacion/table/columns";
import { DataTablePresentacion } from "@/components/presentacion/table/data-table";
import { Label } from "@/components/ui/label";
import { getPresentacion } from "@/helpers/apis/presentacion/presentacion-api";
import { cookies } from "next/headers";

export default async function PresentacionesPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const presentaciones = await getPresentacion(myCookie?.value!);

  const presentacionesPlain = presentaciones.map(p => ({
    id: p.id,
    name: p.name
  }));

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Title
            title="Mis presentaciones"
          />
          <Label className="text-muted-foreground">
            Gestiona y crea nuevas presentaciones
          </Label>
        </div>
        <ModalCreatePresentacion />
      </div>

      <DataTablePresentacion columns={columnsPresentacion} data={presentacionesPlain} />
    </div>
  );
}