import * as yup from "yup";

export const stepNameValidation = yup
  .object({
    firstName: yup.string().required("Este campo é obrigatório."),
    lastName: yup.string().required("Este campo é obrigatório."),
  })
  .required();

export const addressValidation = yup
  .object({
    zipCode: yup
      .string()
      .min(6, "Informe um CEP válido.")
      .required("Este campo é obrigatório."),
    addressLine: yup.string().required("Este campo é obrigatório."),
    addressLineNumber: yup.string().required("Este campo é obrigatório."),
    neighborhood: yup.string().required("Este campo é obrigatório."),
  })
  .required();
