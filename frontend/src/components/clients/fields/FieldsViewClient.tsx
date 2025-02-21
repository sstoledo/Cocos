'use client';

import { ViewClientFieldsProps } from "@clients/types";
import { Label } from "@ui/label";

export const ViewClientFields = ({ client }: ViewClientFieldsProps) => {

  const renderField = (label: string, value: string) => (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}:
      </Label>
      <span className="text-base font-medium">{value || '-'}</span>
    </div>
  );

  //Quiero que todos los input no se puedan editar
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      {renderField("Nombre", client.name)}
      {renderField("Apellido Paterno", client.apat)}
      {renderField("Apellido Materno", client.amat)}
      {renderField("Dni", client.dni)}
      {renderField("Teléfono", client.phone)}
      {renderField("Dirección", client.address)}
      {renderField("Email", client.email)}
    </div>
  )
}