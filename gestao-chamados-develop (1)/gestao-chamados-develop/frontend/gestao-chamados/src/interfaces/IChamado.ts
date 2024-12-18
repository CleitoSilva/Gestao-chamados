import { IArea } from "./IArea";
import { ICategoriaColaborador } from "./ICategoriaColaborador";
import { ICategoriaTecnica } from "./ICategoriaTecnica";
import { IColaborador } from "./IColaborador";
import { IComponente } from "./IComponente";
import { IEmpresa } from "./IEmpresa";
import { ILinha } from "./ILinha";
import { IMaquina } from "./IMaquina";
import { ISubArea } from "./ISubArea";
import { ITechniques } from "./ITechniques";

export interface IChamado {
    id: string;
    tempoTotalChamado: number; //floor?
    tempoAguardoTecnicoChamado: number; //floor?
    tempoAtendimentoChamado: number; //floor?
    openColaborator: IColaborador;
    area: IArea;
    subArea?: ISubArea;
    line: ILinha;
    machine: IMaquina;
    status: string; //num tava marcado o tipo no git
    empresa?: IEmpresa;
    createdDate: string;
    techniques: ITechniques[];
}