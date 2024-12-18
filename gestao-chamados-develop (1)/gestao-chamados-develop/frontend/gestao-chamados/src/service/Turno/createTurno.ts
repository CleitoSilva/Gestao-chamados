import { ITurno } from "./../../interfaces/ITurno";
import { Api } from "../api";

export const createTurno = async (data: ITurno) => {
  const response = await Api.post("/shifts", data);
  return response;
};
