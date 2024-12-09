export const verifyToken = async(token:string)=>{
  
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/private`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  return resp.json();
}