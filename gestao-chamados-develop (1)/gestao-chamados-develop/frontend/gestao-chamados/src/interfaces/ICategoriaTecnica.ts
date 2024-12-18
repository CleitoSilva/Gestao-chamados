import { IArea } from "./IArea";
import { IEmpresa } from "./IEmpresa";

export interface ICategoriaTecnica {
    id: number;
    name: string;
    description: string;
    typeCategory: number;
    areaLocationCover?: IArea;
    empresa?: IEmpresa;
}