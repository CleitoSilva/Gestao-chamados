import { IComponente } from "../../interfaces/IComponente";
import { Api } from "../api";

export const createComponente = async (data: IComponente) => {
  const response = await Api.post("/components", data);
  return response;
};
