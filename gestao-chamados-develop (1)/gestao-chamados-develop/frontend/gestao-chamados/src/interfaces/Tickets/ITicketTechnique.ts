import { ICategoriaTecnica } from "../ICategoriaTecnica";
import { ITicket } from "./ITicket";

export interface ITicketTechnique {
  idTechniqueCategory: number;
  idTicket: number;

  serviceStatus: number;

  techniqueCategory: ICategoriaTecnica | undefined;
  ticket: ITicket | undefined;
}