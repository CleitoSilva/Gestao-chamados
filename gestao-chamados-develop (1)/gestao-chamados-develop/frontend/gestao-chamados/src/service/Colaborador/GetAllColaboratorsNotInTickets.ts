import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { IColaborador } from "../../interfaces/IColaborador";

export const GetAllColaboratorsNotInTickets = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<IColaborador[]>, any> | undefined> => {
	try { 
		const response = await Api.get(`/colaborators/not-in-tickets?idTicket=${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};