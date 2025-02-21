import { getAllLots } from "@apis/lots";
import { columnsLot, DataTableLot } from "@lots/table";
import { Button } from "@ui/button";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function LotsPage() {

  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');
  const lots = await getAllLots(myCookie?.value!);


  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Almacen de lotes"
            subTitle="Gestiona los lotes de tus productos"
          />
        </div>
        <div>
          <Link href="/dashboard/lotes/create">
            <Button>
              Crear lote
            </Button>
          </Link>
        </div>
      </div>
      
      <DataTableLot columns={columnsLot} data={lots} />
    </div>
  );
}