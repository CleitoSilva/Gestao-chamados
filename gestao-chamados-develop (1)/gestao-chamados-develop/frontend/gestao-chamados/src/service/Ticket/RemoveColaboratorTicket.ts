import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const RemoveColaboratorTicket = async (idTicket: number, idColaborator: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.delete(`/tickets/colaborator`, {
      data: {
        id: idTicket,
        idColaborator: idColaborator
      }
    });

		return response;
	} catch (error) {
		return undefined;
	}
};