import { getProduct } from "@apis/products";
import { FormLot } from "@lots/form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface Props {
  params: {
    id?: string[]
  }
}

export default async function CreateLotPage({ params }: Props) {

  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/login');
  }

  let codeProduct = '';
  let bandera = false;

  const resolvedParams = params;

  if (resolvedParams.id && resolvedParams.id[0]) {
    bandera = true;
    try {
      const product = await getProduct(myCookie.value, resolvedParams.id[0]);
      codeProduct = product.code;
    } catch (error) {
      console.log('Error al obtener el producto', error);
    }
  }


  return (
    <div className="flex items-center justify-center h-[calc(100vh-130px)]">
      {bandera ?
        <FormLot
          token={myCookie.value}
          codeProduct={codeProduct}
        />
        :
        <FormLot
          token={myCookie.value}
        />
      }
    </div>
  );
}