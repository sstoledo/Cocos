import { getProduct } from '@apis/products';
import { FormEditProduct } from '@product/form';
import { cookies } from 'next/headers';

interface Props {
  params: {
    id: string
  };
}

export default async function EditProductPage({ params }: Props) {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  const product = await getProduct(myCookie?.value!, params.id);



  return (
    <div className='h-[calc(100vh-130px)] flex items-center justify-center'>
      <FormEditProduct
        mode='update'
        product={product}
        token={myCookie?.value!}
      />
    </div>
  );
};