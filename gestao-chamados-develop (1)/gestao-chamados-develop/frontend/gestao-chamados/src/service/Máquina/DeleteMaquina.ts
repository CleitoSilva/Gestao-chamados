import { Api } from "../api";

export const DeleteMaquina = async (id: string) =>{
		const response = await Api.delete(`/machines/${id}`);
		return response;
};