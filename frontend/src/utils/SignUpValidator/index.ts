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
    city: yup.string().required("Este campo é obrigatório."),
    state: yup.string().required("Este campo é obrigatório."),
  })
  .required();

export const identificationValidation = yup.object({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("Este campo é obrigatório"),

  phone: yup.string().required("Este campo é obrigatório"),

  cpf: yup
    .string()
    .max(14, "Informe um CPF válido")
    .required("Este campo é obrigatório"),

  birthDate: yup
    .string()
    .required("Este campo é obrigatório")
    .test("is-valid-date", "Informe uma data válida", (value) => {
      if (!value) return false;

      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
});

export const securityValidation = yup.object({
  password: yup
    .string()
    .min(8, "Sua senha deve ter no mínimo 8 caratectes")
    .required("Este campo é obrigatório"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas são diferentes")
    .required("Este campo é obrigatório"),
});
