'use server'
import { headers } from 'next/headers'

export const getUserInfo = ()=>{

  const headersList = headers();
  const userInfoHeader = headersList.get('x-user-info')

  if (!userInfoHeader) {
    console.error('No se encontró la información del usuario en los headers')
    return null;
  }

  try {
    const userInfo = JSON.parse(userInfoHeader)
    return userInfo;
  } catch (error) {
    console.error('Error al analizar la información del usuario:', error)
    return null;
  }


}