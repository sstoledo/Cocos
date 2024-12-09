import { getClient } from "@apis/clients";
import { DetailsClient } from "@clients/form";
import { cookies } from "next/headers";

interface IParams {
  params: {
    id: string
  };
}

export default async function ClientPage({ params }: IParams) {

  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const client = await getClient(myCookie?.value!, params.id);


  return (
    <DetailsClient
      client={client}
    />
  );
}