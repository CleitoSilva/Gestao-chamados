import { IEmpresa } from "./IEmpresa";
import { IMaquina } from "./IMaquina";

export interface IComponente {
    id: string;
    name: string;
    description: string;
    machine?: IMaquina;
    empresa?: IEmpresa;
}