import { Api } from "../api";

export const DeleteArea = async (id: string) => {
  const response = await Api.delete(`/areas/${id}`);

  return response;
};
