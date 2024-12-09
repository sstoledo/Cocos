'use client';

import { ViewCategoryFieldsProps } from "@category/types";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Label } from "@ui/label";



export const ViewCategoryFields = ({ category }: ViewCategoryFieldsProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre:
        </Label>
        <Input
          contentEditable={false}
          id="name"
          value={category.name}
          className="col-span-3"
          autoFocus
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="level" className="text-right">
          Jerarquia:
        </Label>
        <Input
          contentEditable={false}
          id="level"
          value={category.level}
          className="col-span-3"
        />
      </div>

      {category.fatherName && category.level > 0 ? (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fatherName" className="text-right">
            Categoria Padre:
          </Label>
          <Input
            contentEditable={false}
            id="fatherName"
            value={category.fatherName}
            className="col-span-3"
          />
        </div>
      ) : (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isRootCategory" className="text-right">
            Categoria Raiz:
          </Label>
          <div className="flex items-center justify-center col-span-3">
            <Checkbox
              id="isRootCategory"
              checked={category.isRootCategory}
              className="col-span-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}