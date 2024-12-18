import { IArea } from "../../interfaces/IArea";
import { Api } from "../api";

export const CreateArea = async (data: IArea) => {
  const response = await Api.post("/areas", data);
  return response;
};
