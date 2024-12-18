import { ILinha } from "../../interfaces/ILinha";
import { Api } from "../api";

export const createLinha = async (data: ILinha) => {
  const response = await Api.post("/lines", data);
  return response;
};
