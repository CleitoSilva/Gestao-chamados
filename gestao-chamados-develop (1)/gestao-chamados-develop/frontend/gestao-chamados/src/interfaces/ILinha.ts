import { IArea } from "./IArea";
import { IEmpresa } from "./IEmpresa";
import { ISubArea } from "./ISubArea";

export interface ILinha {
    id: string;
    name: string;
    number: number;
    description: string;
    empresa?: IEmpresa;
    area?: IArea;
    subArea?: ISubArea;
}