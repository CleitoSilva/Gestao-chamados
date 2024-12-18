import { Api } from "../api";

export const GetPaginateUsuario = async (data: string) =>{
	try {
		const response = await Api.get(`/users/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};