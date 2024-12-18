import React, { useState, useEffect } from "react";
import "./SelectFilter.css";
import { IArea } from "../../interfaces/IArea";
import { ISubArea } from "../../interfaces/ISubArea";
import { AreaService, CategoriaTecnincaService, LinhaService, MaquinaService, SubAreaService, TurnoService } from "../../service";
import { ILinha } from "../../interfaces/ILinha";
import { IMaquina } from "../../interfaces/IMaquina";
import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { ITurno } from "../../interfaces/ITurno";
import { type } from "@testing-library/user-event/dist/type";

interface FilterInputProps {
    column: string;
    number: number;
    value?: string;
    isFilter?: number;
    isOpcional?: number;
    idArea?: string;
    onFilterChange: (value: string) => void;
}

const SelectFilter: React.FC<FilterInputProps> = ({ number, column, onFilterChange, isFilter, isOpcional, idArea, value}) => {
    const [data, setData] = useState<(IArea | ISubArea | ILinha | IMaquina | ICategoriaTecnica)[]>([]);
    const [dataTurno, setDataTurno] = useState<(ITurno)[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>("");
    
    useEffect(() => {if(value) setSelectedValue(value)},[value]);
    
    // Resgatando os items
    useEffect(() => {
        const loadData = async () => {
            try {
                let items: (IArea | ISubArea | ILinha | IMaquina | ICategoriaTecnica)[] = [];
                let itemsTurno: (ITurno)[] = [];
                switch (number) {
                    case 0: {
                        const areasResult = await AreaService.GetAllAreas() as IArea[];
                        items = areasResult;
                        break;
                    }
                    case 1: {
                        const subAreasResult = await SubAreaService.GetAllSubAreas() as ISubArea[];
                        if(idArea){
                            const subAreas = subAreasResult;
                            items = subAreas.filter((subarea) => String(subarea.area?.id) === String(idArea));
                        } else {
                            items = subAreasResult;
                        }
                        break;
                    }
                    case 2: {
                        const linesResult = await LinhaService.GetAllLinhas() as ILinha[];
                        items = linesResult;
                        break;
                    }
                    case 3: {
                        const machinesResult = await MaquinaService.GetAllMachines() as IMaquina[];
                        items = machinesResult;
                        break;
                    }
                    case 4: {
                        const categoriaTecnicaResult = await CategoriaTecnincaService.GetAllCategoriaTecnica() as ICategoriaTecnica[];
                        items = categoriaTecnicaResult;
                        break;
                    }
                    case 5: {
                        const turnoResult = await TurnoService.GetAllTurnos() as ITurno[];
                        itemsTurno = turnoResult;
                        setDataTurno(itemsTurno);
                        break;
                    }
                    default:
                        break;
                }

                const sortedNames = items.sort((a, b) => a.name.localeCompare(b.name));
                setData(sortedNames);

                // Setando o valor inicial do filtro para o primeiro item da lista
                if (items.length > 0 && !selectedValue && (isFilter === undefined || isFilter === null) && (isOpcional === undefined || isOpcional === null)) {
                    setSelectedValue(items[0].id as any); // Possível problema
                    onFilterChange(items[0].id as any);
                }

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        loadData();
    }, [number, idArea]);

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onFilterChange(value);
    };

    return (
        <div className="input-block">
            <label htmlFor={column} className="title-input">{column}</label>
            <select
                className="form-control"
                name="type"
                id={column}
                onChange={handleInputChange}
                value={selectedValue} >

                {isFilter === 1 && <option key={0} value={""}>Todos</option>}
                {(isOpcional === 1 && isFilter !== 0) && <option key={1} value={""}>Nenhum</option>}
                {(isOpcional === 1 && isFilter === 0) && <option key={2} value={""}>Nenhum</option>}

                {number !== 5 && data.map((area, index) => (
                    <option key={index+3} value={area.id}>{area.name}</option>
                ))}

                {number === 5 && dataTurno.map((turno, index) => (
                    <option key={index+3} value={turno.id}>{turno.description}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;
