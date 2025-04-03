import * as Yup from 'yup'
export const MIN_CHARS_FOR_PASSWORD = 8

// Validaciones personalizadas
export function validateLength(value: string) {
  return /^.*.{8}$/.test(value)
}

export function validateAtLeastOneLowercase(value: string) {
  return /^(?=.*[a-z])/.test(value)
}

export function validateAtLeastOneUppercase(value: string) {
  return /^(?=.*[A-Z])/.test(value)
}

export function validateAtLeastOneDigit(value: string) {
  return /^(?=.*[0-9])/.test(value)
}

export function validateAtLeastOneSpecialChar(value: string) {
  return /^(?=.*["!@#$%^&*)(+=._-])/.test(value)
}

// Método para agregar la validación al esquema Yup
function strongPasswordMethod(this: Yup.StringSchema, message: string = 'Not strong Password') {
  return this.test('strongPasswordTest', message, function (value) {
    const { path, createError } = this

    // Verificar si el valor es `undefined` o vacío y marcarlo como válido (si no es requerido)
    if (!value) {
      return true
    }

    // Validar cada criterio de la contraseña
    if (!validateAtLeastOneLowercase(value)) {
      return createError({ path, message: 'validations:passwordWithNoLowercase' })
    }
    if (!validateAtLeastOneUppercase(value)) {
      return createError({ path, message: 'validations:passwordWithNoUppercase' })
    }
    if (!validateAtLeastOneDigit(value)) {
      return createError({ path, message: 'validations:passwordWithNoDigit' })
    }
    if (!validateAtLeastOneSpecialChar(value)) {
      return createError({ path, message: 'validations:passwordWithNoSpecialChar' })
    }

    return true
  })
}

// Agregar método personalizado a Yup.string
//@ts-ignore
Yup.addMethod(Yup.string, 'strongPassword', strongPasswordMethod)

// Extender Yup para incluir el nuevo método como parte de sus tipos
declare module 'yup' {
  interface StringSchema {
    strongPassword(message?: string): this
  }
}
