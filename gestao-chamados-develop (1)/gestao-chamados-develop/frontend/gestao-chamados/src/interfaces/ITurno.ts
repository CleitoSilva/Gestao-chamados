import { IEmpresa } from "./IEmpresa";

export interface ITurno {
    id: string;
    description: string;
    startHour: string;
    endHour: string;
    empresa?: IEmpresa;
}