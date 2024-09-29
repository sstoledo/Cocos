'use client'

import { BarChart, DollarSign, ShoppingCart, Users, X } from "lucide-react"
import { useUIStore } from "@/store"
import { Button } from "./button"
import { BodyFont } from "@/config/fonts"
import Link from "next/link"


export const Sidebar = () => {

  const {isSideMenuOpen,closeSideMenu} = useUIStore(state=>state);


  return (
    <aside className={`${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 border-b">
        <span className={`${BodyFont.className} text-2xl font-semibold`}>Mi Dashboard</span>
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
        <Link className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100" href="#">
          <BarChart className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="#">
          <Users className="w-5 h-5 mr-3" />
          Users
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="#">
          <ShoppingCart className="w-5 h-5 mr-3" />
          Products
        </Link>
        <Link className="flex items-center px-6 py-2 mt-5 text-gray-700 hover:bg-gray-100" href="#">
          <DollarSign className="w-5 h-5 mr-3" />
          Sales
        </Link>
      </nav>
    </aside>
  )
}
