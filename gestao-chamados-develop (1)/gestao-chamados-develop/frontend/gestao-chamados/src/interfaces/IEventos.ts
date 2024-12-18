import { IArea } from "./IArea";
import { IEmpresa } from "./IEmpresa";

export interface IEventos {
    id: string;
    codigoEvento: number;
    nomeEvento: string;
    HorarioEvento: Date;
    mensagemEvento: string;
    area?: IArea;
    empresa?: IEmpresa;
}