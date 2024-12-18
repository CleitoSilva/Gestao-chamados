import { IEmpresa } from "./IEmpresa";

export interface ICategoriaColaborador {
    id: string;
    name: string;
    description: string;
    typeCategory: number;
    empresa?: IEmpresa;
}