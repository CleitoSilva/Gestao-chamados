import { IChamado } from "../../pages/CriacaoChamado/Interfaces/IChamado";
import { Api } from "../api";

export const CreateTicket = async (data: IChamado) => {
  const response = await Api.post("/tickets", data);
  return response;
};
