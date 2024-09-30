import { ClientResponse } from "@/interfaces";

export const getClients = async(token:string):Promise<ClientResponse[]>=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}


export const getClient = async(token:string,id:string):Promise<ClientResponse>=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/${id}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}