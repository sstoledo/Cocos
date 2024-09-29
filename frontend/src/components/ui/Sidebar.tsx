'use client'

import Cookies from "js-cookie"
import { BodyFont } from "@/config/fonts"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"


export const Sidebar = () => {
  
  const path = usePathname();
  const router = useRouter();

  const onLogout = ()=>{
    
    Cookies.remove("authToken");
    router.replace("/");

  };
  
  return (
    <>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 bg-blue-800 "
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border border-blue-800 bg-blue-800 pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg- divide-y space-y-1">
              <ul className="space-y-2 pb-2 ">

                <li>
                  <Link
                    href="/dashboard/home"
                    className={`${path === '/dashboard/home' ? 'bg-gray-300 hover:bg-gray-400' : ''} text-base capitalize text-white font-bold rounded-lg flex items-center p-2 group`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>

                    <span className={`ml-3 ${BodyFont.className}`}>
                      Inicio
                    </span>
                  </Link>
                </li>
              </ul>


            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <button
            className="mb-10 btn-primary text-white"
            onClick={onLogout}
          >
            Cerrar sesion
          </button>
        </div>

      </aside>

    </>
  )
}
