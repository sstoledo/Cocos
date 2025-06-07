export const providerValidationRules = {
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
  },
  address: {
    required: "La dirección es obligatoria",
    minLength: {
      value: 2,
      message: "La dirección debe tener al menos 2 caracteres"
    },
    maxLength: {
      value: 50,
      message: "La dirección no debe exceder los 50 caracteres"
    }
  },
  phone: {
    required: "El numero de teléfono es obligatorio",
    minLength: {
      value: 9,
      message: "El numero de teléfono debe tener al menos 9 caracteres"
    },
    maxLength: {
      value: 9,
      message: "El numero de teléfono no debe exceder los 9 caracteres"
    }
  },
  email: {
    required: "El correo electrónico es obligatorio",
    minLength: {
      value: 11,
      message: "El correo electrónico debe tener al menos 11 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El correo electrónico no debe exceder los 50 caracteres"
    }
  }
};