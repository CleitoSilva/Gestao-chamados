import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IUsuario } from "../../../../../interfaces/IUsuario";

interface TableProps {
    data: IUsuario[];
    onClickEdit: (empresa: IUsuario) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickDelete, onClickEdit/*  onClickToggle, , */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeUsuario">
                        <p>Nome</p>
                    </th>
                    <th title="userName">
                        <p>User</p>
                    </th>
                    <th title="email">
                        <p>E-Mail</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((user: IUsuario) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={user?.name}>
                            <p>
                                {user?.name}
                            </p>
                        </td>
                        <td title={user?.userName}>
                            <p>
                                {user?.userName}
                            </p>
                        </td>
                        <td title={user?.email}>
                            <p>
                                {user?.email}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            {/* <Button title="Editar" onClick={() => onClickEdit(user)}>
                                <PiPencil size={24} />
                            </Button> */}
                            <Button title="Excluir" onClick={() => onClickDelete(user?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
