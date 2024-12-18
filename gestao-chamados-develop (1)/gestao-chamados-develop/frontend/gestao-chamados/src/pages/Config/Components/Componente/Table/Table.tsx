import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IComponente } from "../../../../../interfaces/IComponente";

interface TableProps {
    data: IComponente[];
    onClickEdit: (componente: IComponente) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickDelete, onClickEdit/*   onClickToggle, , */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeComponente">
                        <p>Nome</p>
                    </th>
                    <th title="descricaoComponente">
                        <p>Descrição</p>
                    </th>
                    <th title="maquina">
                        <p>Máquina</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((componente: IComponente) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={componente?.name}>
                            <p>
                                {componente?.name}
                            </p>
                        </td>
                        <td title={componente?.description}>
                            <p>
                                {componente?.description}
                            </p>
                        </td>
                        <td title={componente?.machine?.name}>
                            <p>
                                {componente?.machine?.name}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(componente)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(componente?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
