import { Address } from "./address";

export interface DataCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  address: Address;
  password: string;
}
