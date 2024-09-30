import { getClient } from "@/helpers";
import { cookies } from "next/headers";

interface IParams{
  params : {
    id: string
  };
}

export default async function ClientPage({params}:IParams) {  

  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');


  const client = await getClient(myCookie?.value!,params.id);


  return (
    <div>
      <h1>{JSON.stringify(client)}</h1>
    </div>
  );
}