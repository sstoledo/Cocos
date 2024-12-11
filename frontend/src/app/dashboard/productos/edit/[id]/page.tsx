import { getProduct } from '@apis/products';
import { FormEditProduct } from '@product/form';
import { cookies } from 'next/headers';

interface Props {
  params: {
    id: string
  };
}

export default async function EditProductPage({ params }: Props) {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const product = await getProduct(myCookie?.value!, params.id);


  
  return (
    <div>
      <FormEditProduct
        mode='update'
        product={product}
        token={myCookie?.value!}
      />
    </div>
  );
};