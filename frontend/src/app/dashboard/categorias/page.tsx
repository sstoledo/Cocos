import { getAllCategories } from "@apis/categories";
import { ModalCreateCategory } from "@category/modal";
import { columnsCategory, DataTableCategory } from "@category/table";
import { Label } from "@ui/label";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";


export default async function CategoriasPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const categories = await getAllCategories(myCookie?.value!);

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Title
            title="Mis categorias"
          />
          <Label className="text-muted-foreground">
            Gestiona y crea nuevas categorias
          </Label>
        </div>
        <ModalCreateCategory />
      </div>

      <DataTableCategory columns={columnsCategory} data={categories} />
    </div>
  );
}