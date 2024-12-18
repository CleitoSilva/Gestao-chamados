import { Api } from "../api";

export const GetPaginateColaborador = async (data: string) =>{
	try {
		const response = await Api.get(`/colaborators/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};