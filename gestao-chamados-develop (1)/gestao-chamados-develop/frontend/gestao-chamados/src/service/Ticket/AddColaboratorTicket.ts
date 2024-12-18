import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const AddColaboratorTicket = async (idTicket: number, idColaborator: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/colaborator`, {
      id: idTicket,
      idColaborator: idColaborator
    });

		return response;
	} catch (error) {
		return undefined;
	}
};