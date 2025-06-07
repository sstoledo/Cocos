import { getAllCategories } from "@apis/categories";
import { ModalCreateCategory } from "@category/modal";
import { columnsCategory, DataTableCategory } from "@category/table";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";


export default async function CategoriasPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  const categories = await getAllCategories(myCookie?.value!);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Mis categorias" subTitle="Gestiona tus categorias"
          />
        </div>
        <div>
          <ModalCreateCategory />
        </div>
      </div>

      <DataTableCategory columns={columnsCategory} data={categories} />
    </div>
  );
}