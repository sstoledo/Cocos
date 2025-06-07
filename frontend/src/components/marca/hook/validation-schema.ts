export const marcaValidationRules = {
  name: {
    required: "El nombre de la marca es obligatorio",
    minLength: {
      value: 2,
      message: "El nombre de la marca debe tener al menos 2 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El nombre de la marca no debe exceder los 50 caracteres"
    }
  }
};