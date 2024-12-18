import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IArea } from "../../../../../interfaces/IArea";

interface TableProps {
    data: IArea[];
    onClickEdit: (empresa: IArea) => void;
    onClickDelete: (id: string) => void;
    onAtualizar: () => void;
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data,  onClickDelete, onClickEdit, onAtualizar /*  onClickToggle,  */ }) => {


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
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((area: IArea) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={area?.name}>
                            <p>
                                {area?.name}
                            </p>
                        </td>
                        <td title={area?.description}>
                            <p>
                                {area?.description}
                            </p>
                        </td>
                        <td>
                            <Button title="Editar" onClick={async () => {
                                await onClickEdit(area);
                            }
                            }>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={async () => {
                                await onClickDelete(area.id) //Deletar
                            }} theme="error">
                            <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
