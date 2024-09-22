import axios from "axios";

export const viaCepService = async (cep: string) => {
  const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return result.data;
};
