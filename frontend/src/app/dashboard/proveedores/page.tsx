import { getAllProviders } from "@apis/providers";
import { ModalCreateProvider } from "@provider/modal";
import { columnsProvider, DataTableProvider } from "@provider/table";
import { Label } from "@ui/label";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";

export default async function ProveedoresPage() {

  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');
  const proveedores = await getAllProviders(myCookie?.value!);

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Title
            title="Mis proveedores"
          />
          <Label className="text-muted-foreground">
            Gestiona y crea nuevas proveedores
          </Label>
        </div>
        <ModalCreateProvider />
      </div>

      <DataTableProvider columns={columnsProvider} data={proveedores} />
    </div>
  );
}