import { Person } from "./person";

export interface DataCreateUser {
  mail: string;
  password: string;
  image?: File[] | null;
  person: Person;
}
