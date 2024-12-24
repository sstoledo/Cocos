"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Separator } from "@ui/separator";
import { ScrollArea } from "@ui/scroll-area";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Minus, Plus, X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ cart, removeFromCart, updateQuantity, isOpen, onClose }: CartProps) => {
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <Card className="w-[450px] shadow-lg mx-auto absolute top-16 right-8 border border-light-border-default dark:border-dark-border-default px-4 z-10 bg-light-bg-container dark:bg-dark-bg-container">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Carrito de compras ({cart.length})</CardTitle>
      </CardHeader>
      <Separator className="bg-light-border-default dark:bg-dark-border-default" />
      {cart.length === 0 ? (
        <CardContent className="p-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
          Tu carrito está vacío.
        </CardContent>
      ) : (
        <>
          <ScrollArea className="h-[300px]">
            <CardContent className="p-4">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-4 w-20">
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium leading-none truncate w-20 text-light-text-primary dark:text-dark-text-primary">{item.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            disabled={item.quantity === 1}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                            className="h-8 w-16 text-center bg-light-bg-container dark:bg-dark-bg-container text-light-text-primary dark:text-dark-text-primary"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between space-x-6">
                        <div className="flex items-center">
                          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < cart.length - 1 && <Separator className="my-4 bg-light-border-default dark:bg-dark-border-default" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-4">
            <div className="flex w-full flex-col space-y-4">
              <Separator className="bg-light-border-default dark:bg-dark-border-default" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Subtotal</span>
                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button className="
              w-full 
              bg-light-btn-secondary
              hover:bg-light-btn-secondary-hover
              text-light-bg-container 
              dark:text-dark-text-primary
              dark:bg-dark-btn-secondary
              dark:hover:bg-dark-btn-secondary-hover
              "
              >
                Proceder al pago
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};