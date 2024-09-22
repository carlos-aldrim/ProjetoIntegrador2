import { Address } from "./address";

export interface Person {
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  address: Address;
}