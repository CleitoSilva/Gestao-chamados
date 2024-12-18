import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { Api } from "../api";

export const ChangeResponsibleTicket = async (idTicket: number, idColaborator: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/responsible`, {
      id: idTicket,
      idResponsibleManutentor: idColaborator
    });

		return response;
	} catch (error) {
		return undefined;
	}
};