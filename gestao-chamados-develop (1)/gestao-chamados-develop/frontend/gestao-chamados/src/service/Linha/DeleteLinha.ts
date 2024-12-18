import { Api } from "../api";

export const DeleteLinha = async (id: string) => {
  const response = await Api.delete(`/lines/${id}`);
  return response;
};
