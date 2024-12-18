import { Api } from "../api";

export const DeleteTurno = async (id: string) => {
  const response = await Api.delete(`/shifts/${id}`);
  return response;
};
