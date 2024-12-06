"use client";

import PresentacionForm from "../form/FormCreatePresentacion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { useState } from "react";

export function ModalCreatePresentacion() {

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Presentacion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Presentacion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Crea una nueva presentación para tus productos
        </DialogDescription>
        <PresentacionForm onSucces={handleCloseModal}/>
      </DialogContent>
    </Dialog>
  );

}