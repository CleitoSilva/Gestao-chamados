import { IEmpresa } from "./IEmpresa";

export interface IArea {
    id: string;
    name: string;
    description: string;
    enterprise: IEmpresa;
}