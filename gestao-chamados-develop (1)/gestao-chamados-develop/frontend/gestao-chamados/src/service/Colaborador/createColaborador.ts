import { IColaborador } from "../../interfaces/IColaborador";
import { Api } from "../api";

export const createColaborador = async (data: IColaborador) => {
  const response = await Api.post("/colaborators", data);
  return response;
};
