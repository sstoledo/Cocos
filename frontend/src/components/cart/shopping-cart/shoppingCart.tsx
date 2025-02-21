"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Separator } from "@ui/separator";
import { ScrollArea } from "@ui/scroll-area";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import Receipt from "@cart/receipt/receipt";

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
  const [showReceipt, setShowReceipt] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    const maxQuantity = cart.find((item) => item.id === id)?.stock;
    const validQuantity = Math.min(Math.max(1, quantity), maxQuantity!);
    updateQuantity(id, validQuantity);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <Card className="
    w-[280px]
    am:w-[350px]
    sm:w-[400px] 
    dsm:w-[450px] 
    shadow-lg mx-auto fixed 
    top-16 right-2 border 
    sm:right-4
    md:right-8
    border-light-border-default 
    dark:border-dark-border-default 
    px-2 sm:px-4 z-10 
    bg-light-bg-container 
    dark:bg-dark-bg-container
    ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4">
        <CardTitle
          className="text-base sm:text-lg font-bold text-light-text-primary dark:text-dark-text-primary"
        >
          Carrito de compras ({cart.length})
        </CardTitle>
      </CardHeader>
      <Separator className="bg-light-border-default dark:bg-dark-border-default" />
      {cart.length === 0 ? (
        <CardContent className="p-4 sm:p-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
          Tu carrito está vacío.
        </CardContent>
      ) : (
        <>
          <ScrollArea className="h-[250px] sm:h-[300px]">
            <CardContent className="p-2 sm:p-4">
              <div className="space-y-2 sm:space-y-4">
                {cart.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-20">
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium leading-none truncate w-full sm:w-20 text-light-text-primary dark:text-dark-text-primary">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Button
                            disabled={item.quantity === 1}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-6 w-6 sm:h-8 sm:w-8"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Input
                            type="number"
                            max={item.stock}
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                            className="h-6 w-12 sm:h-8 sm:w-16 text-center bg-light-bg-container dark:bg-dark-bg-container text-light-text-primary dark:text-dark-text-primary text-sm sm:text-base"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-6 w-6 sm:h-8 sm:w-8"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
                        <div className="flex items-center">
                          <p className="text-sm sm:text-base font-medium text-light-text-primary dark:text-dark-text-primary
                          "
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 sm:h-8 sm:w-8"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < cart.length - 1 &&
                      <Separator className="my-2 sm:my-4 bg-light-border-default dark:bg-dark-border-default" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-2 sm:p-4">
            <div className="flex w-full flex-col space-y-2 sm:space-y-4">
              <Separator className="bg-light-border-default dark:bg-dark-border-default" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">
                    Subtotal
                  </span>
                  <span className="text-sm sm:text-base font-medium text-light-text-primary dark:text-dark-text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button className="
                w-full 
                text-sm
                sm:text-base
                py-2
                sm:py-4
                bg-light-btn-secondary
                hover:bg-light-btn-secondary-hover
                text-light-bg-container 
                dark:text-dark-text-primary
                dark:bg-dark-btn-secondary
                dark:hover:bg-dark-btn-secondary-hover
              "
                onClick={() => setShowReceipt(true)}
              >
                Generar boleta de compra
              </Button>
              {showReceipt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 max-h-[90vh] overflow-y-auto relative">
                    <Button
                      onClick={() => setShowReceipt(false)}
                      className="absolute top-2 right-2"
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Receipt
                      cart={cart}
                      customerInfo={{
                        name: "Cliente General",
                        dni: "-"
                      }}
                    />
                  </div>
                </div>
              )}

            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};