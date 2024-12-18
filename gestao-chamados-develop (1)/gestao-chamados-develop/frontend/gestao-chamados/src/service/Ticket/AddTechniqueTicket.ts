import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const AddTechniqueTicket = async (idTicket: number, idTechCategory: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/especiality`, {
      idTicket: idTicket,
      idTechCategory: idTechCategory
    });

		return response;
	} catch (error) {
		return undefined;
	}
};