export const loginValidationRules = {
  email: {
    required: "El email es requerido",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "El email ingresado no es válido"
    },
    minLength: {
      value: 5,
      message: "El email debe tener al menos 5 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El email no debe exceder los 50 caracteres"
    }
  },
  password: {
    required: "La contraseña es requerida",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres"
    },
    maxLength: {
      value: 50,
      message: "La contraseña no debe exceder los 50 caracteres"
    }
  }
}