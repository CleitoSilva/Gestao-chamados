import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { ISubArea } from "../../../../../interfaces/ISubArea";

interface TableProps {
    data: ISubArea[];
    onClickEdit: (subArea: ISubArea) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickDelete, onClickEdit,/* onClickEdit, onClickToggle*/ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeArea">
                        <p>Nome</p>
                    </th>
                    <th title="descricaoArea">
                        <p>Descrição</p>
                    </th>
                    <th title="area">
                        <p>Área</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((subArea: ISubArea) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={subArea?.name}>
                            <p>
                                {subArea?.name}
                            </p>
                        </td>
                        <td title={subArea?.description}>
                            <p>
                                {subArea?.description}
                            </p>
                        </td>
                        <td title={subArea?.area?.name}>
                            <p>
                                {subArea?.area?.name}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(subArea)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(subArea?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
