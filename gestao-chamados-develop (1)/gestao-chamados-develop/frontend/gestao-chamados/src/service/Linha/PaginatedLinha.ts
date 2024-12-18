import { Api } from "../api";

export const GetPaginateLinhas = async (data: string) =>{
	try {
		const response = await Api.get(`/lines/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};