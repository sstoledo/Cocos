import { Credentials } from "@interfaces/auth";

export const login = async(credentials:Credentials)=>{

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return resp.json();
};