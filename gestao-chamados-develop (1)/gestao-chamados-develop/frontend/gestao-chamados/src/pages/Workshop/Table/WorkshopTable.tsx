
import { FC } from "react";
import './Workshop.styles.css'
import { IChamado } from "../../../interfaces/IChamado";
import { format } from "date-fns";
import { EnumStatus } from "../Enum/enumStatus";
import { useNavigate } from "react-router-dom";

interface TableProps {
    data: IChamado[];
    idCategoria: number;
    // onClickEdit: (empresa: IChamado) => void;
    // onClickDelete: (id: string) => void;
    // onAtualizar: () => void;
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, idCategoria /* ,  onClickDelete, onClickEdit, onAtualizar   onClickToggle,  */ }) => {

    const getStatus = (status: number) => {
        return EnumStatus(status);
    };

    const navigate = useNavigate();

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="date">
                        <p>Data de início</p>
                    </th>
                    <th title="areaName">
                        <p>Área</p>
                    </th>
                    <th title="subAreaName">
                        <p>Subárea</p>
                    </th>
                    <th title="lineName">
                        <p>Linha</p>
                    </th>
                    <th title="machineName">
                        <p>Máquina</p>
                    </th>
                    <th title="statusChamado">
                        <p>Status Chamado</p>
                    </th>
                    <th title="statusChamado">
                        <p>Status Técnico</p>
                    </th>
                    <th title="colaboratorName">
                        <p>Requisitante</p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((chamado: IChamado) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr onClick={() => {
                        navigate("/ticket/"+chamado.id)
                    }}>
                        <td title={chamado.createdDate}>
                            <p>
                                {format(chamado.createdDate, 'dd/MM/yyyy HH:mm')}
                            </p>
                        </td>
                        <td title={chamado.area?.name}>
                            <p>
                                {chamado.area?.name}
                            </p>
                        </td>
                        <td title={chamado.subArea?.name}>
                            <p>
                                {chamado.subArea?.name}
                            </p>
                        </td>
                        <td title={chamado.line?.name}>
                            <p>
                                {chamado.line?.name}
                            </p>
                        </td>
                        <td title={chamado.machine?.name}>
                            <p>
                                {chamado.machine?.name}
                            </p>
                        </td>
                        <td title={chamado.status}>
                            <p>
                                {getStatus(Number(chamado.status))}
                            </p>
                        </td>
                         <td title={chamado.techniques?.find(tec => String(tec.idTicket) === String(chamado.id) && String(tec.idTechniqueCategory) === String(idCategoria))?.serviceStatus}> {/*Pedir para explicar como isso vai funcionar? */}
                            <p>
                                {getStatus(Number(chamado.techniques?.find(tec => String(tec.idTicket) === String(chamado.id) && String(tec.idTechniqueCategory) === String(idCategoria))?.serviceStatus))}
                            </p>
                        </td>
                        <td title={chamado.openColaborator.name}>
                            <p>
                                {chamado.openColaborator.name}
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
