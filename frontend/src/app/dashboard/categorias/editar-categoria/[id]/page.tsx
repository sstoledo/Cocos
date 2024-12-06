import { FormEditCategory } from "@/components/category/form/FormEditCategory";
import { getCate, getCategories } from "@/helpers/apis/categories/categories-api";
import { cookies } from "next/headers";

interface IParams {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: IParams) {

  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const category = await getCate(myCookie?.value!, params.id);

  return (
    <div>
      <FormEditCategory 
        category = {category}
        token = {myCookie?.value!}
      />
    </div>
  );
}