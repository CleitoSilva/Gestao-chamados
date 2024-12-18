import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { Api } from "../api";

export const GetStatusByTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<{ status: number }>, any> | undefined> => {
	try { 
		const response = await Api.get(`/tickets/status/${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};