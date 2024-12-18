import { Api } from "../api";

export const GetColaboradorCategoriaTecnicaById = async (id: string) =>{
	try {
		const response = await Api.get(`/technique-category/${id}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};