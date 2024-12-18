import { Api } from "../api";

export const DeleteComponente = async (id: string) => {
  const response = await Api.delete(`/components/${id}`);
  return response;
};
