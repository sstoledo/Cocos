

interface Credentials{
  email:string;
  password:string;
}

export const login = async(credentials:Credentials)=>{

  const resp = await fetch("http://localhost:4000/api/auth/login",{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return resp.json();
};