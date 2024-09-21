export interface ResponseLoginUser {
  user: {
    mail: string;
    name: string;
    id: number;
    image: string;
  };
  token: string;
  message: string;
}
