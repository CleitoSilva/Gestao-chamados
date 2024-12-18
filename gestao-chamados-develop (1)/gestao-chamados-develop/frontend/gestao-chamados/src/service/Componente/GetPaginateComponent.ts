import { Api } from "../api";

export const GetPaginateComponets = async (data: string) =>{
	try {
		const response = await Api.get(`/components/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};