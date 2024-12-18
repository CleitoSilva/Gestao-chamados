import { IArea } from "./IArea";
import { ICategoriaColaborador } from "./ICategoriaColaborador";
import { ICategoriaTecnica } from "./ICategoriaTecnica";
import { IEmpresa } from "./IEmpresa";
import { ILinha } from "./ILinha";
import { ITurno } from "./ITurno";

export interface IColaborador {
    id: number;
    name: string;
    description: string;
    categoriaColaborador: ICategoriaColaborador;
    techniqueCategory?: ICategoriaTecnica;
    shift: ITurno;
    line: ILinha;
    rfidCardNumber: string;
    badgeCardNumber: string;
    reNumber: string;
    empresa?: IEmpresa;
}