import { Api } from "../api";

export const DeleteCategoriaTecnica = async (id: string) => {
  const response = await Api.delete(`/technique-category/${id}`);
  return response;
};
