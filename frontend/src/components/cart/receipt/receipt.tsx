import React, { useRef } from 'react';
import { CartItem } from '@cart/shopping-cart';
import { Card } from '@ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';
import { Button } from '@ui/button';
import { Printer } from 'lucide-react';
import Image from 'next/image';
import logotipo3 from "@assets/images/coco_blue_marine_text_white.png";
import { Label } from '@ui/label';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CustomerInfo {
  name?: string;
  dni?: string;
}

interface ReceiptProps {
  cart: CartItem[];
  customerInfo?: CustomerInfo;
}

const Receipt = ({ cart, customerInfo }: ReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const automovilInfo = {
    matricula: 'ABC-123',
    modelo: 'Golf'
  };

  const handlePrint = async () => {
    if (!receiptRef.current) return;

    // Desplázate al inicio del contenido para asegurar que todo esté visible
    window.scrollTo(0, 0);

    // Espera un momento para asegurar que el contenido esté completamente renderizado
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Captura el contenido del recibo como una imagen
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2, // Aumenta la calidad de la imagen
      useCORS: true, // Permite cargar imágenes externas (como el logotipo)
      logging: true, // Habilita logs para depuración
      allowTaint: true, // Permite el uso de imágenes externas
    });

    // Convierte la imagen a un archivo PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Crea un PDF en formato A4
    const imgWidth = 210; // Ancho de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Escala la altura

    // Agrega la imagen al PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Descarga el PDF
    pdf.save(`proforma-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}.pdf`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Descargar boleta
        </Button>
      </div>
      <Card  className="w-full max-w-3xl mx-auto bg-white shadow-lg bg-light-bg-primary text-dark-bg-primary">
        <div ref={receiptRef} className="flex flex-col gap-6 p-8">
          {/* Header */}
          <Card className='bg-dark-text-accent text-dark-bg-primary font-bold'>
            <div className="flex justify-around items-center py-6">
              <Image
                src={logotipo3}
                height={100}
                width={150}
                alt='logotipo'
                className='rounded-lg object-contain'
                priority
              />
              <h1 className="text-3xl font-bold text-gray-800">AUTOSERVICIOS COCOCARS</h1>
            </div>

            <div className="text-center header pb-6">
              <div className="grid grid-cols-2 gap-4">
                <Label className="text-sm font-bold">RUC: 10445049641</Label>
                <Label className="text-sm font-bold">Pasaje Demetrio Perez S/N, Zapata</Label>
                <Label className="text-sm font-bold">Telefono: 964 321 678</Label>
                <Label className="text-sm font-bold">Email: autoservicios_cococars@gmail.com</Label>
              </div>
            </div>
          </Card>

          {/* Receipt Info */}
          <div className="grid grid-cols-2 gap-6">
            <Label className='text-start'>
              <strong>No Recibo:</strong> INV-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </Label>
            <Label className='text-end'>
              <strong>Fecha:</strong> {new Date().toLocaleDateString()}
            </Label>
          </div>

          {/* Customer Info && Automovil Info */}
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-4'>
              <Label className='text-start'>
                <strong>Cliente:</strong> {customerInfo?.name || '-'}
              </Label>
              <Label className='text-start'>
                <strong>DNI:</strong> {customerInfo?.dni || '-'}
              </Label>
            </div>

            <div className='flex flex-col gap-4 justify-end'>
              <Label className='text-end'>
                <strong>Modelo:</strong> {automovilInfo?.modelo || '-'}
              </Label>
              <Label className='text-end'>
                <strong>Matricula:</strong> {automovilInfo?.matricula || '-'}
              </Label>
            </div>
          </div>

          {/* Items Table */}
          <Table>
            <TableHeader className='bg-dark-text-accent'>
              <TableRow>
                <TableHead className="text-center font-bold">Cantidad</TableHead>
                <TableHead className='text-center font-bold'>Producto</TableHead>
                <TableHead className="text-center font-bold">Precio Unit.</TableHead>
                <TableHead className="text-center font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className='text-center'>{item.name}</TableCell>
                  <TableCell className="text-center">${item.price}</TableCell>
                  <TableCell className="text-center">${(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals */}
          <div className="flex flex-col items-end gap-2 text-sm totals">
            <p className="text-lg font-bold">
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </div>

          {/* Payment Info and Notes */}
          <div className="flex justify-between text-sm text-gray-600 mt-4 payment-info">
            <div>
              <p>
                <strong>Método de pago:</strong> Tarjeta de crédito
              </p>
              <p>
                <strong>ID de Transacción:</strong> TXID-{Math.floor(Math.random() * 100000)}
              </p>
            </div>
            <div>
              <p>
                <strong>Nota:</strong>
              </p>
              <p>¡Gracias por su compra!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;