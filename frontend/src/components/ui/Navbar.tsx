'use client'

import Cookies from "js-cookie";
import { Bell, ChevronDown, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useRouter } from "next/navigation";
import { UserResponse } from "@interfaces/user";
import { useUIStore } from "@store/index";
import { useCart } from "@cart/provider";
import { useState } from "react";
import { Cart } from "@cart/shopping-cart";

interface Props {
  user: UserResponse;
}

export const Navbar = ({ user }: Props) => {
  const { openSideMenu } = useUIStore(state => state);
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onLogout = () => {
    Cookies.remove("authToken");
    router.replace("/");
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="flex items-center justify-between px-6 py-[20px] bg-[#f0f5ff] border-b relative">
      <div className="flex items-center">
        <button onClick={openSideMenu} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Input type="text" placeholder="Search..." className="hidden mx-4 md:block" />
      </div>
      <div className="flex items-center relative">
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <ShoppingCart className="w-5 h-5" />
          <span className="ml-2 text-sm">{cart.length}</span>
        </Button>
        {isCartOpen && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            isOpen={isCartOpen}
            onClose={toggleCart}
          />
        )}
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="text-sm mr-2">{user.user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};