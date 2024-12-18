import { IColaborador } from "../IColaborador";
import { ITicket } from "./ITicket";

export interface ITicketColaborator {
  idColaborator: number;
  idTicket: number;

  colaborator: IColaborador | undefined;
  ticket: ITicket | undefined;
}