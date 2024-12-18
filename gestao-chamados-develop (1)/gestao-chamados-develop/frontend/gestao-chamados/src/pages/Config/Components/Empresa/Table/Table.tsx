import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IEmpresa } from "../../../../../interfaces/IEmpresa";

interface TableProps {
    data: IEmpresa[];
    // onClickEdit: (empresa: IEmpresa) => void;
    // onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data  /* onClickDelete, , onClickToggle, onClickEdit, */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeEmpresa">
                        <p>Nome</p>
                    </th>
                    <th title="Descrição">
                        <p>Descrição</p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((empresa: IEmpresa) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={empresa?.nomeEmpresa}>
                            <p>
                                {empresa?.nomeEmpresa}
                            </p>
                        </td>
                        <td title={empresa?.descricaoEmpresa}>
                            <p>
                                {empresa?.descricaoEmpresa}
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
