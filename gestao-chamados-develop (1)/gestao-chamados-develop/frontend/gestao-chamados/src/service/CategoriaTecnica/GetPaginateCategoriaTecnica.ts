import { Api } from "../api";

export const GetPaginateCategoriaTecnica = async (data: string) =>{
	try {
		const response = await Api.get(`/technique-category/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};