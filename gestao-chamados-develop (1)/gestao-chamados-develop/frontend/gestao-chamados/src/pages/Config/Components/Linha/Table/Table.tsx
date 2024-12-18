import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { ILinha } from "../../../../../interfaces/ILinha";

interface TableProps {
    data: ILinha[];
    onClickEdit: (linha: ILinha) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickDelete, onClickEdit /*onClickToggle, , */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeLinha">
                        <p>Nome</p>
                    </th>
                    <th title="number">
                        <p>Número</p>
                    </th>
                    <th title="descricaoLinha">
                        <p>Descrição</p>
                    </th>
                    <th title="area">
                        <p>Área</p>
                    </th>
                    <th title="Subarea">
                        <p>Subárea</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((linha: ILinha) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={linha?.name}>
                            <p>
                                {linha?.name}
                            </p>
                        </td>
                        <td title={linha?.number?.toString()}>
                            <p>
                                {linha?.number?.toString()}
                            </p>
                        </td>
                        <td title={linha?.description}>
                            <p>
                                {linha?.description}
                            </p>
                        </td>
                        <td title={linha?.area?.name}>
                            <p>
                                {linha?.area?.name}
                            </p>
                        </td>
                        <td title={linha?.subArea?.name}>
                            <p>
                                {linha?.subArea?.name}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(linha)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(linha?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
