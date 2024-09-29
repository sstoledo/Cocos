'use client'

import { useUIStore } from "@/store";
import Cookies from "js-cookie";
import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const { openSideMenu } = useUIStore(state => state);
  const router = useRouter();
  

  const onLogout = ()=>{
    Cookies.remove("authToken");
    router.replace("/");
  }


  return (
    <header className="flex items-center justify-between px-6 py-[13.5px] bg-white border-b">
      <div className="flex items-center">
        <button onClick={openSideMenu} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Input type="text" placeholder="Search..." className="hidden mx-4 md:block" />

      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="text-sm mr-2">John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onLogout}
            >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header >
  )
}
