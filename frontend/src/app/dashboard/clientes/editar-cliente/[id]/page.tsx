import { getClient } from "@apis/clients";
import { FormEditClient } from "@clients/form";
import { cookies } from "next/headers";

interface IParams{
  params : {
    id: string
  };
}

export default async function EditClientPage({params}:IParams) {
  
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const client = await getClient(myCookie?.value!,params.id);
  
  return (
    <div>
      <FormEditClient
        client={client}
        token={myCookie?.value!}
      />
    </div>
  );
}