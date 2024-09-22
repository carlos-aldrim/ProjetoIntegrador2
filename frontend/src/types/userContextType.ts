import { DataCreateUser } from "./dataCreateUser";
import { User } from "./user";

export interface UserContextType {
  user: User | null;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
  confirmUser: (mail: string, confirmToken: string) => Promise<void>;
  isLogin: boolean;
  loading: boolean;
  isAuth: boolean;
  createUser: (user: DataCreateUser) => Promise<void>;
}
