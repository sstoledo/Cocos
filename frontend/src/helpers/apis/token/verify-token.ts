

export const verifyToken = async(token:string)=>{
  
  const resp = await fetch("http://localhost:4000/api/auth/private",{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  return resp.json();
}