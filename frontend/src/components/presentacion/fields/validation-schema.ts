export const presentacionValidationRules = {
  name: {
    required: "El nombre de la presentación es obligatorio",
    minLength: {
      value: 2,
      message: "El nombre de la presentación debe tener al menos 2 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El nombre de la presentación no debe exceder los 50 caracteres"
    }
  }
};