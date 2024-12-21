'use client'

import Link from "next/link"
import { BarChart, DollarSign, Layers, ShoppingCart, Truck, Users, X } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import logotipo from "@assets/images/logtipo.jpg"
import { useUIStore } from "@store/index"
import { BodyFont } from "@config/fonts"


export const Sidebar = () => {

  const { isSideMenuOpen, closeSideMenu } = useUIStore(state => state);

  return (
    <aside className={`${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed h-full top-0 left-0 z-50 w-64 bg-primary-light shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 border-b">
        <span className={`${BodyFont.className} text-2xl font-semibold`}>
          <Image
            src={logotipo}
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
      <nav className="mt-5 text-black">
        <Link className="flex items-center px-6 py-2hover:bg-gray-100" href="/dashboard">
          <BarChart className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 hover:bg-gray-100" href="/dashboard/clientes">
          <Users className="w-5 h-5 mr-3" />
          Clientes
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 hover:bg-gray-100" href="/dashboard/productos">
          <ShoppingCart className="w-5 h-5 mr-3" />
          Productos
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5  hover:bg-gray-100" href="#">
          <DollarSign className="w-5 h-5 mr-3" />
          Ventas
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5  hover:bg-gray-100" href="/dashboard/proveedores">
          <Truck className="w-5 h-5 mr-3" />
          Proveedores
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5  hover:bg-gray-100" href="/dashboard/categorias">
          <Layers className="w-5 h-5 mr-3" />
          Categorias
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5  hover:bg-gray-100" href="/dashboard/presentaciones">
          <Layers className="w-5 h-5 mr-3" />
          Presentaciones
        </Link>
      </nav>
    </aside>
  )
}
