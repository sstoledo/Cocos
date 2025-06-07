import { getProduct } from '@apis/products';
import { FormEditProduct } from '@product/form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const product = await getProduct(myCookie.value, id);



  return (
    <div className='h-[calc(100vh-130px)] flex items-center justify-center'>
      <FormEditProduct
        mode='update'
        product={product}
        token={myCookie.value}
      />
    </div>
  );
};