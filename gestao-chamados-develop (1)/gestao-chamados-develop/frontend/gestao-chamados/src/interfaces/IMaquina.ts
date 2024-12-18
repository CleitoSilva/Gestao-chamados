import { IEmpresa } from "./IEmpresa";
import { ILinha } from "./ILinha";

export interface IMaquina {
    id: string;
    name: string;
    description: string;
    order: number;
    line?: ILinha;
    empresa?: IEmpresa;
}