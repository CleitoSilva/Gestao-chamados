import { IEmpresa } from "../../../interfaces/IEmpresa";

export interface IChamado {
    idOpenColaborator: number;
    idArea: number;
    idSubArea?: number;
    idLine: number;
    idMachine: number;
    idTechniqueCategory: number;
    idEnterprise: string;
}