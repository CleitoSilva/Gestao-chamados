import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IMaquina } from "../../../../../interfaces/IMaquina";

interface TableProps {
    data: IMaquina[];
    onClickEdit: (maquina: IMaquina) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickDelete, onClickEdit  /*  onClickToggle, */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeMaquina">
                        <p>Nome</p>
                    </th>
                    <th title="descricaoMaquina">
                        <p>Descrição</p>
                    </th>
                    <th title="ordemMaquina">
                        <p>Ordem</p>
                    </th>
                    <th title="linha">
                        <p>Linha</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((maquina: IMaquina) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={maquina?.name}>
                            <p>
                                {maquina?.name}
                            </p>
                        </td>
                        <td title={maquina?.description}>
                            <p>
                                {maquina?.description}
                            </p>
                        </td>
                        <td title={maquina?.order?.toString()}>
                            <p>
                                {maquina?.order}
                            </p>
                        </td>
                        <td title={maquina?.line?.name}>
                            <p>
                                {maquina?.line?.name}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(maquina)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(maquina?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
