'use client'

import Link from "next/link"
import { useUIStore } from "@/store"
import { BodyFont } from "@/config/fonts"
import { BarChart, DollarSign, ShoppingCart, Users, X } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import logtipo from "@/../assets/images/logtipo.jpg"


export const Sidebar = () => {

  const {isSideMenuOpen,closeSideMenu} = useUIStore(state=>state);

  return (
    <aside className={`${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 border-b">
        <span className={`${BodyFont.className} text-2xl font-semibold`}>
          <Image 
            src={logtipo}
            alt="logo"
            width={100}
            height={100}
          />
        </span>
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={closeSideMenu}
            className="lg:hidden ml-8"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
      </div>
      <nav className="mt-5">
        <Link className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100" href="/dashboard">
          <BarChart className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="/dashboard/clientes">
          <Users className="w-5 h-5 mr-3" />
          Clientes
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="/dashboard/productos">
          <ShoppingCart className="w-5 h-5 mr-3" />
          Productos
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="#">
          <DollarSign className="w-5 h-5 mr-3" />
          Ventas
        </Link>
      </nav>
    </aside>
  )
}
