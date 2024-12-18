import { Api } from "../api";

export const GetPaginateTurno = async (data: string) =>{
	try {
		const response = await Api.get(`/shifts/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};