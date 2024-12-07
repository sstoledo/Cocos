'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryByIdResponse } from "@/interfaces/categories/categories-response";

interface Props {
  category: CategoryByIdResponse;
}

export default function ViewCategoryFields({ category }: Props) {
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
              // contentEditable={!category.isRootCategory}
              checked={category.isRootCategory} 
              className="col-span-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}