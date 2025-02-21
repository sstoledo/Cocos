export const clientValidationRules = {
  name: {
    required: "El nombre del cliente es obligatorio",
    minLength: {
      value: 2,
      message: "El nombre del cliente debe tener al menos 2 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El nombre del cliente no debe exceder los 50 caracteres"
    }
  },
  apat: {
    required: "El Apellido paterno del cliente es obligatorio",
    minLength: {
      value: 3,
      message: "El nombre del cliente debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El nombre del cliente no debe exceder los 50 caracteres"
    }
  },
  amat: {
    required: "El Apellido materno del cliente es obligatorio",
    minLength: {
      value: 3,
      message: "El nombre del cliente debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El nombre del cliente no debe exceder los 50 caracteres"
    }
  },
  dni: {
    required: "El dni del cliente es obligatorio",
    pattern: {
      value: /^[0-9]{8}$/,
      message: "El dni del cliente debe tener 8 digitos"
    }
  },
  address: {
    required: "La direccion del cliente es obligatoria",
    minLength: {
      value: 10,
      message: "La direccion del cliente debe tener al menos 10 caracteres"
    },
    maxLength: {
      value: 100,
      message: "La direccion del cliente no debe exceder los 100 caracteres"
    }
  },
  phone: {
    required: "El telefono del cliente es obligatorio",
    pattern: {
      value: /^[0-9]{9}$/,
      message: "El telefono del cliente debe tener 9 digitos"
    }
  },
  email: {
    required: "El email del cliente es obligatorio",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "El email del cliente no es valido"
    },
    minLength: {
      value: 10,
      message: "El email del cliente debe tener al menos 10 caracteres"
    },
    maxLength: {
      value: 70,
      message: "El email del cliente no debe exceder los 70 caracteres"
    }
  }
}