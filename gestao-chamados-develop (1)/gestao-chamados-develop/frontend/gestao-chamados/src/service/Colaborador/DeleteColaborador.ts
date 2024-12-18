import { Api } from "../api";

export const DeleteColaborador = async (id: string) =>{
	try {
		const response = await Api.delete(`/colaborators/${id}`);
		return response;
	} catch (error) {
		return error;
	}
};