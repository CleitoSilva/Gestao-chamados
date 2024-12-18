import { IChamado } from './../interfaces/IChamado';
import { IArea } from "../interfaces/IArea";
import { ICategoriaColaborador } from "../interfaces/ICategoriaColaborador";
import { ICategoriaTecnica } from "../interfaces/ICategoriaTecnica";
import { ITicket } from "../interfaces/Tickets/ITicket";
import { IColaborador } from "../interfaces/IColaborador";
import { IComponente } from "../interfaces/IComponente";
import { IEmpresa } from "../interfaces/IEmpresa";
import { IEventos } from "../interfaces/IEventos";
import { ILinha } from "../interfaces/ILinha";
import { IMaquina } from "../interfaces/IMaquina";
import { ISubArea } from "../interfaces/ISubArea";
import { ITurno } from "../interfaces/ITurno";
import { IUsuario } from "../interfaces/IUsuario";

export type OptionsType = {
  label: string;
  value: string;
};

export type LineCardGalerryType = {
  id: string;
  number: number;
  label: string;
  in: number;
  out: number;
  description: string;
  status: boolean;
  undefinedRange: number;
  columnsChartData: {
    label: string;
    in: number;
    out: number;
    undefinedRange: number;
  }[];
  statusRunning?: -1 | 0 | 1;
};
export type MachineCardGalerryType = {
  id: string;
  condition: number;
  label: string;
  in: number;
  out: number;
  description: string;
  status: boolean;
  address: string;
  undefinedRange: number;
  statusRunning?: -1 | 0 | 1;
};

export type BadgeType = {
  text: string;
  variant: "default" | "error" | "active";
};

export type FormType = IEmpresa | IArea | ICategoriaColaborador | ICategoriaTecnica | ITicket | IColaborador | IChamado | IComponente | IEventos | ILinha | IMaquina | ISubArea | ITurno | IUsuario;
export type TableDataType = (IEmpresa | IArea | ICategoriaColaborador | ICategoriaTecnica | ITicket | IChamado | IColaborador | IComponente | IEventos | ILinha | IMaquina | ISubArea | ITurno | IUsuario | IChamado)[];
