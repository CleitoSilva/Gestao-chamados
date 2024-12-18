import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IChamado } from "../../../../../interfaces/IChamado";

interface TableProps {
    data: IChamado[];
    // onClickEdit: (empresa: IEmpresa) => void;
    // onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data  /* onClickDelete, , onClickToggle, onClickEdit, */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="tempoTotalChamado">
                        <p>Tempo total</p>
                    </th>
                    <th title="tempoAguardoTecnicoChamado">
                        <p>Tempo de aguardo técnico</p>
                    </th>
                    <th title="tempoAtendimentoChamado">
                        <p>Tempo de atendimento</p>
                    </th>
                    <th title="nomeColaborador">
                        <p>Colaborador</p>
                    </th>
                    <th title="nomeManutentor">
                        <p>Manutentor</p>
                    </th>
                    <th title="nomeArea">
                        <p>Área</p>
                    </th>
                    <th title="nomeSubArea">
                        <p>Subárea</p>
                    </th>
                    <th title="nomeLinha">
                        <p>Linha</p>
                    </th>
                    <th title="nomeMaquina">
                        <p>Máquina</p>
                    </th>
                    <th title="status">
                        <p>Status</p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">

            </tbody>
        </table>
    )
}
