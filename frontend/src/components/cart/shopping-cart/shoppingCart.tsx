"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Separator } from "@ui/separator";
import { ScrollArea } from "@ui/scroll-area";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ cart, removeFromCart, updateQuantity, isOpen, onClose }: CartProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Cierra el carrito al presionar ESC
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleQuantityChange = (id: string, quantity: number) => {
    const maxQuantity = cart.find((item) => item.id === id)?.stock;
    const validQuantity = Math.min(Math.max(1, quantity), maxQuantity!);
    updateQuantity(id, validQuantity);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!mounted || !isOpen) return null;

  const handleProforma = () => {
    onClose();
    router.push('/dashboard/proforma');
  }

  // Calcula el ahorro si existiera un precio original más alto
  const calculateSavings = () => {
    const originalTotal = subtotal * 1.1; // Simulando un 10% de descuento
    return originalTotal - subtotal;
  }

  return (
    <>
      {/* Overlay para cerrar al hacer clic afuera */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9]"
        onClick={onClose}
      />

      <Card className="
        w-full max-w-md
        md:max-w-lg
        lg:max-w-xl
        shadow-xl fixed 
        top-16 right-2
        sm:right-4
        md:right-8
        border-light-border-default 
        dark:border-dark-border-default 
        z-10 
        bg-light-bg-container 
        dark:bg-dark-bg-container
        rounded-lg
        overflow-hidden
        transition-all
        duration-300
      ">
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
            <CardTitle
              className="text-base sm:text-lg font-bold text-light-text-primary dark:text-dark-text-primary"
            >
              Carrito de compras
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-light-bg-subtle dark:hover:bg-dark-bg-subtle"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Separator className="bg-light-border-default dark:bg-dark-border-default" />

        {cart.length === 0 ? (
          <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center gap-4 h-[300px]">
            <div className="h-16 w-16 rounded-full bg-light-bg-subtle dark:bg-dark-bg-subtle flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-light-text-secondary dark:text-dark-text-secondary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary max-w-xs">
                Parece que aún no has agregado productos a tu carrito. ¡Explora nuestro catálogo!
              </p>
            </div>
            <Button
              onClick={onClose}
              className="mt-2 bg-light-btn-secondary hover:bg-light-btn-secondary-hover text-light-bg-container dark:text-dark-text-primary"
            >
              Explorar productos
            </Button>
          </CardContent>
        ) : (
          <>
            <div className="px-4 py-2 bg-light-bg-subtle dark:bg-dark-bg-subtle border-b border-light-border-default dark:border-dark-border-default">
              <div className="grid grid-cols-12 text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">
                <div className="col-span-5 sm:col-span-6">Producto</div>
                <div className="col-span-4 text-center">Cantidad</div>
                <div className="col-span-3 sm:col-span-2 text-right">Subtotal</div>
              </div>
            </div>

            <ScrollArea className="h-[270px] sm:h-[320px] md:h-[350px]">
              <CardContent className="p-0">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-light-border-default dark:border-dark-border-default last:border-b-0"
                    >
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 sm:py-4 items-center">
                        {/* Producto */}
                        <div className="col-span-5 sm:col-span-6">
                          <div className="space-y-1">
                            <h3 className="font-medium leading-tight truncate text-light-text-primary dark:text-dark-text-primary">
                              {item.name}
                            </h3>
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              ${item.price} / unidad
                            </p>
                          </div>
                        </div>

                        {/* Cantidad */}
                        <div className="col-span-4 flex items-center justify-center">
                          <div className="flex items-center border border-light-border-default dark:border-dark-border-default rounded-md">
                            <Button
                              disabled={item.quantity <= 1}
                              variant="ghost"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-none border-r border-light-border-default dark:border-dark-border-default"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              max={item.stock}
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                              className="h-8 w-14 sm:w-14 text-center border-0 rounded-none bg-light-bg-container dark:bg-dark-bg-container"
                            />
                            <Button
                              disabled={item.quantity >= item.stock}
                              variant="ghost"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-none border-l border-light-border-default dark:border-dark-border-default"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 sm:col-span-1 text-right">
                          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Eliminar */}
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 text-light-text-danger hover:text-light-text-danger-hover dark:text-dark-text-danger dark:hover:text-dark-text-danger-hover"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </ScrollArea>

            <div className="p-4 sm:p-6 bg-light-bg-subtle dark:bg-dark-bg-subtle border-t border-light-border-default dark:border-dark-border-default">
              <div className="space-y-3">
                {/* Ahorro (opcional) */}
                <div className="flex items-center justify-between text-light-text-success dark:text-dark-text-success">
                  <span className="text-sm">Ahorro</span>
                  <span className="text-sm font-medium">${calculateSavings().toFixed(2)}</span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Subtotal</span>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-2 border-t border-light-border-default dark:border-dark-border-default">
                  <span className="text-base font-medium text-light-text-primary dark:text-dark-text-primary">Total</span>
                  <span className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-light-border-default dark:border-dark-border-default text-light-text-primary dark:text-dark-text-primary"
                >
                  Seguir comprando
                </Button>
                <Button
                  onClick={handleProforma}
                  className="bg-light-btn-secondary hover:bg-light-btn-secondary-hover text-light-bg-container dark:text-dark-text-primary dark:bg-dark-btn-secondary dark:hover:bg-dark-btn-secondary-hover flex items-center justify-center gap-1"
                >
                  <span>Finalizar</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
};