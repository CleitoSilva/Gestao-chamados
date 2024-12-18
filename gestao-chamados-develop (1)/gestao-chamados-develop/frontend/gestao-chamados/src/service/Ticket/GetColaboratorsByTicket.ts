import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { ITicketColaborator } from "../../interfaces/Tickets/ITicketColaborator";
import { Api } from "../api";

export const GetColaboratorsByTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<ITicketColaborator[]>, any> | undefined> => {
	try { 
		const response = await Api.get(`/tickets/colaborators/${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};