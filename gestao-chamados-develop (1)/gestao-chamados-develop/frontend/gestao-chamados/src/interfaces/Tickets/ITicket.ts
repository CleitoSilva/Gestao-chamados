import { IArea } from "../IArea";
import { ICategoriaColaborador } from "../ICategoriaColaborador";
import { ICategoriaTecnica } from "../ICategoriaTecnica";
import { IColaborador } from "../IColaborador";
import { IComponente } from "../IComponente";
import { IEmpresa } from "../IEmpresa";
import { ILinha } from "../ILinha";
import { IMaquina } from "../IMaquina";
import { ISubArea } from "../ISubArea";
import { ITurno } from "../ITurno";
import { IEvent } from "./IEvent";
import { ITicketColaborator } from "./ITicketColaborator";
import { ITicketTechnique } from "./ITicketTechnique";

export interface ITicket {
    id: number;
    totalTicketTime: number;
    totalWaitingTechnicalTime: number;
    totalServiceTime: number;
    status: number;
    idOpenColaborator: number | undefined;
    idResponsibleManutentor: number | undefined;
    idArea: number | undefined;
    idSubArea: number | undefined;
    idLine: number | undefined;
    idMachine: number | undefined;
    idComponent: number | undefined;
    idTechniqueCategory: number | undefined;
    idEnterprise: string;

    openColaborator: IColaborador | undefined;
    responsibleManutentor: IColaborador | undefined;
    area: IArea | undefined;
    subArea: ISubArea | undefined;
    line: ILinha | undefined;
    machine: IMaquina | undefined;
    component: IComponente | undefined;
    techniqueCategory: ITicketTechnique | undefined;
    enterprise: IEmpresa | undefined;

    events: IEvent[];
    colaborators: ITicketColaborator[];
    techniques: ITicketTechnique[];
}