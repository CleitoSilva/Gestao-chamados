import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IEventos } from "../../../../../interfaces/IEventos";

interface TableProps {
    data: IEventos[];
    // onClickEdit: (empresa: IEmpresa) => void;
    // onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data  /* onClickDelete, , onClickToggle, onClickEdit, */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="codigoEvento">
                        <p>Código</p>
                    </th>
                    <th title="nomeEvento">
                        <p>Nome</p>
                    </th>
                    <th title="horarioEvento">
                        <p>Horário</p>
                    </th>
                    <th title="mensagemEvento">
                        <p>Mensagem</p>
                    </th>
                    <th title="empresa">
                        <p>Empresa</p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((eventos: IEventos) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                         <td title={eventos?.codigoEvento?.toString()}>
                            <p>
                                {eventos?.codigoEvento?.toString()}
                            </p>
                        </td>
                        <td title={eventos?.nomeEvento}>
                            <p>
                                {eventos?.nomeEvento}
                            </p>
                        </td>
                        <td title={eventos?.HorarioEvento?.toDateString()}>
                            <p>
                                {eventos?.HorarioEvento?.toDateString()}
                            </p>
                        </td>
                        <td title={eventos?.mensagemEvento}>
                            <p>
                                {eventos?.mensagemEvento}
                            </p>
                        </td>
                        <td title={eventos?.empresa?.nomeEmpresa}>
                            <p>
                                {eventos?.empresa?.nomeEmpresa}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        {/* <td>
                            <Button title="Editar" onClick={() => onClickEdit(empresa)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(empresa?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
