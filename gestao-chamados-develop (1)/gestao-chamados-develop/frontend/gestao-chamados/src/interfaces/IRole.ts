import { IEntity } from "./IEntity";

export interface IRole extends IEntity {
  id: number;
  description: string;
}