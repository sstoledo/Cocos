export const lotValidationRules = {
  codeProduct: {
    required: "El código del producto es obligatorio",
    minLength: {
      value: 4,
      message: "El código del producto debe tener al menos 4 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El código del producto no debe exceder los 50 caracteres"
    }
  },
  quantity: {
    required: "La cantidad es obligatoria",
    min: {
      value: 0,
      message: "La cantidad debe ser positiva"
    }
  },
  dateEntry: {
    required: "La fecha de entrada es obligatoria",
  },
  priceBuy: {
    required: "El precio de compra es obligatorio",
    min: {
      value: 0,
      message: "El precio de compra debe ser positivo"
    }
  },
  priceLot: {
    required: "El precio de venta es obligatorio",
    min: {
      value: 0,
      message: "El precio de venta debe ser positivo"
    }
  }
}