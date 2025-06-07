'use client';

import Link from "next/link";
import { BarChart, Bookmark, Car, DollarSign, Layers, Package, ShoppingCart, Tag, Truck, Users, X } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import logotipo from "@assets/images/logtipo.jpg";
import logotipo1 from "@assets/images/coco_black_blue_text_white.png";
import logotipo2 from "@assets/images/coco_black_text_white.png";
import logotipo3 from "@assets/images/coco_blue_marine_text_white.png";
import logotipo4 from "@assets/images/coco_white_skye_blue_text_black.png";
import { useUIStore } from "@store/index";
import { BodyFont } from "@config/fonts";
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', icon: BarChart, label: 'Dashboard' },
  { href: '/dashboard/clientes', icon: Users, label: 'Clientes' },
  { href: '/dashboard/productos', icon: ShoppingCart, label: 'Productos' },
  { href: '/dashboard/lotes', icon: Package, label: 'Lotes' },
  { href: '/dashboard/ventas', icon: DollarSign, label: 'Ventas' },
  { href: '/dashboard/proveedores', icon: Truck, label: 'Proveedores' },
  { href: '/dashboard/categorias', icon: Layers, label: 'Categorias' },
  { href: '/dashboard/presentaciones', icon: Bookmark, label: 'Presentaciones' },
  { href: '/dashboard/marcas', icon: Tag, label: 'Marcas' },
  { href: '/dashboard/servicios', icon: Tag, label: 'Servicios' },
  { href: '/dashboard/automovil', icon: Car, label: 'Automóviles' },
];

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore(state => state);
  const pathname = usePathname();

  const isActiveLink = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay for mobile */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSideMenu}
        />
      )}

      <aside className={`
      ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed h-screen top-0 left-0 z-50 
      w-[280px] 
      bg-light-bg-secondary dark:bg-dark-bg-primary 
      border-r border-light-border-default dark:border-dark-border-default
      shadow-lg
      transform transition-all duration-300 ease-in-out 
      lg:translate-x-0 lg:static lg:inset-0
    `}>
        {/* Header */}
        <div className="flex items-center h-16 px-6 border-b border-light-border-default dark:border-dark-border-default">
          <div className="flex-1 flex justify-center">
            <Image
              src={logotipo3}
              alt="logo"
              height={50}
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSideMenu}
            className="lg:hidden hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary rounded-full"
          >
            <X className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = isActiveLink(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                flex items-center px-4 py-2.5 rounded-lg
                am:text-sm md:text-base lg:text-lg font-medium
                transition-all duration-200
                group
                ${isActive
                    ? 'bg-light-btn-tertiary dark:bg-dark-btn-tertiary text-light-btn-primary dark:text-dark-btn-primary'
                    : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-btn-tertiary-hover dark:hover:bg-dark-bg-hover'
                  }
              `}
              >
                <Icon className={`
                w-5 h-5 mr-3 
                transition-colors duration-200
                ${isActive
                    ? 'text-light-btn-primary dark:text-dark-btn-primary'
                    : 'text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'
                  }
              `} />
                <span className={BodyFont.className}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-light-border-default dark:border-dark-border-default">
          <div className="flex items-center px-4 py-2 space-x-3">
            <div className="w-9 h-9 rounded-full bg-light-btn-primary/15 dark:bg-dark-btn-primary/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-light-btn-primary dark:text-dark-btn-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`${BodyFont.className} text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate`}>
                Admin User
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">
                admin@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
