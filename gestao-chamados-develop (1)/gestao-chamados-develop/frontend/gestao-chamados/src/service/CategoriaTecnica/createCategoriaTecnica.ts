import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { Api } from "../api";

export const createCategoriaTecnica = async (data: ICategoriaTecnica) => {
  const response = await Api.post("/technique-category", data);
  return response;
};
