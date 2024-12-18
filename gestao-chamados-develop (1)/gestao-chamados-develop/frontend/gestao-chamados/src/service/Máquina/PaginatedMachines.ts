import { Api } from "../api";

export const GetPaginateMachines = async (data: string) =>{
	try {
		const response = await Api.get(`/machines/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};