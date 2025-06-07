import { getClient } from "@apis/clients";
import { DetailsClient } from "@clients/form";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClientPage({ params }: { params: { id: string } }) {

  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/auth/login');
  }

  const client = await getClient(myCookie.value, params.id);


  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Title
                  title="Detalle de cliente"
                  subTitle="Vista detallada de un cliente"
                />
              </div>
            </div>
      <DetailsClient
        client={client}
      />
    </div>
  );
}