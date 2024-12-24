'use client';

import Cookies from "js-cookie";
import { Bell, Menu, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useRouter } from "next/navigation";
import { UserResponse } from "@interfaces/user";
import { useUIStore } from "@store/index";
import { useCart } from "@cart/provider";
import { useState } from "react";
import { Cart } from "@cart/shopping-cart";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ModeToggle } from "@themes/button";
import Swal from "sweetalert2";

interface Props {
  user: UserResponse;
}

export const Navbar = ({ user }: Props) => {
  const { openSideMenu } = useUIStore(state => state);
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!user.user) {
    // Implementar un alert de error y al dar click me mande a la página de login
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes estar logeado para acceder a esta página',
      background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
      confirmButtonText: 'Ir a la página de login',
      confirmButtonColor: '#3b82f6',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: '#0f172a',
      showCancelButton: true,
    });
    window.location.href = '/auth/login';
  }

  const onLogout = () => {
    Cookies.remove("authToken");
    router.replace("/");
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-light-bg-primary/60 dark:supports-[backdrop-filter]:bg-dark-bg-primary/60 border-b border-light-border-default dark:border-dark-border-default shadow-sm">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Button
            onClick={openSideMenu}
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary rounded-full"
          >
            <Menu className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Cart button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary rounded-full relative"
            >
              <ShoppingCart className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-light-btn-primary dark:bg-dark-btn-primary text-light-bg-container dark:text-dark-bg-container text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>

          {isCartOpen && (
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              isOpen={isCartOpen}
              onClose={toggleCart}
            />
          )}

          {/* Notifications button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary rounded-full"
          >
            <Bell className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          </Button>

          {/* Theme toggle */}
          <ModeToggle />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary">
                    {user.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 border border-light-border-default dark:border-dark-border-default bg-light-bg-container dark:bg-dark-bg-container rounded-lg shadow-lg"
            >
              <DropdownMenuLabel className="text-light-text-primary dark:text-dark-text-primary">
                Mi Cuenta
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-light-border-default dark:bg-dark-border-default" />
              <DropdownMenuItem className="py-2 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary cursor-pointer">
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary cursor-pointer">
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-2 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary cursor-pointer"
                onClick={onLogout}
              >
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};