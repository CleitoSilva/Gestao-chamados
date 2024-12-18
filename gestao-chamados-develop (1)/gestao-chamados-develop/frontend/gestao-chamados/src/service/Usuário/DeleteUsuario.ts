import { Api } from "../api";

export const DeleteUsuario = async (id: string) =>{
	try {
		const response = await Api.delete(`/users/${id}`);
		return response;
	} catch (error) {
		return error;
	}
};