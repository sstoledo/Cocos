import React from 'react';
import { Button } from "@ui/button";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';
import { CartItem } from '@cart/shopping-cart';


interface CustomerInfo {
  name?: string;
  dni?: string;
}

interface ReceiptProps {
  cart: CartItem[];
  customerInfo?: CustomerInfo;
}

const Receipt = ({ cart, customerInfo }: ReceiptProps) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // IGV en Perú es 18%
  const total = subtotal + tax;
  const date = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Math.random().toString(36).substr(2, 9)}`;

  const handleDownloadPDF = () => {
    const element = document.getElementById('receipt-container');
    const opt = {
      margin: 1,
      filename: `recibo-${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <Button
        onClick={handleDownloadPDF}
        className="mb-4 flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Descargar PDF
      </Button>

      <div id="receipt-container" className="bg-white p-8 rounded-lg shadow-lg">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Farmacia Universal</h1>
          <p className="text-gray-600">Av. Principal 123, Lima, Perú</p>
          <p className="text-gray-600">Tel: (01) 123-4567 | RUC: 20123456789</p>
        </div>

        {/* Información de la boleta */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-bold">Boleta Nº: {invoiceNumber}</p>
            <p>Fecha: {date}</p>
          </div>
          <div className="text-right">
            <p>Cliente: {customerInfo?.name || 'Cliente General'}</p>
            <p>DNI: {customerInfo?.dni || '-'}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Descripción</th>
              <th className="text-center py-2">Cantidad</th>
              <th className="text-right py-2">Precio Unit.</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">S/ {item.price}</td>
                <td className="text-right py-2">S/ {(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totales */}
        <div className="flex flex-col items-end gap-2 mb-8">
          <div className="flex justify-between w-48">
            <span>Subtotal:</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-48">
            <span>IGV (18%):</span>
            <span>S/ {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-48 font-bold text-lg">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pie de página */}
        <div className="text-center text-sm text-gray-600 mt-8 pt-8 border-t">
          <p>¡Gracias por su compra!</p>
          <p>Este documento es un comprobante válido para efectos tributarios</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;