import * as yup from "yup";

export const signInSchemaValidator = yup.object({
  mail: yup.string().email("Informe um e-mail válido").required("Este campo é obrigatório"),
  password: yup.string().required("Este campo é obrigatório"),
}).required();

export const signUpSchemaValidator = yup.object({
  name: yup.string().required("Este campo é obrigatório"),
  mail: yup.string().email("Informe um e-mail válido").required("Este campo é obrigatório"),
  password: yup.string().required("Este campo é obrigatório"),
  confirm_password: yup.string()
     .oneOf([yup.ref('senha')], 'As senhas são diferentes').required("Este campo é obrigatório")
})

export const profileSchemaValidator = yup.object({
  name: yup.string().required("Este campo é obrigatório"),
  mail: yup.string().email("Informe um e-mail válido").required("Este campo é obrigatório"),
})

export const passwordSchemaValidator = yup.object({
  password: yup.string().required("Este campo é obrigatório"),
  confirm_password: yup.string()
     .oneOf([yup.ref('senha')], 'As senhas são diferentes').required("Este campo é obrigatório")
})

export const stepNameValidation = yup.object({
  firstName: yup.string().required("Este campo é obrigatório"),
  lastName: yup.string().required("Este campo é obrigatório"),
}).required();