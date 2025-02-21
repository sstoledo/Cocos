export const automovilValidationRules = {
  matricula: {
    required: "El matricula es obligatorio",
    minLength: {
      value: 3,
      message: "El matricula debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El matricula no debe exceder los 50 caracteres"
    }
  },
  kilometraje: {
    required: "El kilometraje es obligatorio",
    min: {
      value: 1,
      message: "El kilometraje debe ser positivo"
    }
  },
  idMarca: {
    required: "El id de la marca es obligatorio",
    minLength: {
      value: 3,
      message: "El id de la marca debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El id de la marca no debe exceder los 50 caracteres"
    }
  },
  modelo: {
    required: "El modelo es obligatorio",
    minLength: {
      value: 3,
      message: "El modelo debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El modelo no debe exceder los 50 caracteres"
    }
  },
  idClient: {
    required: "El id del cliente es obligatorio",
    minLength: {
      value: 3,
      message: "El id del cliente debe tener al menos 3 caracteres"
    },
    maxLength: {
      value: 50,
      message: "El id del cliente no debe exceder los 50 caracteres"
    }
  }
}