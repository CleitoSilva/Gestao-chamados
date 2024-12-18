import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { Api } from "../api";

export const GetAllTechsNotInTickets = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<ICategoriaTecnica[]>, any> | undefined> => {
	try { 
		const response = await Api.get(`/technique-category/not-in-tickets?idTicket=${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};