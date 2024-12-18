import { IArea } from "./IArea";
import { IEmpresa } from "./IEmpresa";

export interface ISubArea {
    id: string;
    name: string;
    description: string;
    empresa?: IEmpresa;
    area?: IArea;
}