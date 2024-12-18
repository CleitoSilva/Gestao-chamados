import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { Api } from "../api";

export const StartTicket = async (idTicket: number, idColaborator: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/start`, {
      id: idTicket,
      idResponsibleManutentor: idColaborator
    });

		return response;
	} catch (error) {
		return undefined;
	}
};