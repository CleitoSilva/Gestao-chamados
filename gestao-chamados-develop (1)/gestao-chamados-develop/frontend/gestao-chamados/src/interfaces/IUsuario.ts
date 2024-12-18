import { IEmpresa } from "./IEmpresa";

export interface IUsuario {
    id: string;
    userName: string;
    name: string;
    email: string;
    senha: string;
    idEnterprise: string,
    empresa?: IEmpresa;
}