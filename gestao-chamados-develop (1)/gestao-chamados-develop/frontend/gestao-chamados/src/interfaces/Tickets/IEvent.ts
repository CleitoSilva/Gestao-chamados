import { IEntity } from "../IEntity";
import { ITicket } from "./ITicket";

export interface IEvent extends IEntity {
  id: number; 
  code: number;
  name: string;
  timestamp: string;
  message: string;
  idTicket: number;
  ticket: ITicket | undefined;
}