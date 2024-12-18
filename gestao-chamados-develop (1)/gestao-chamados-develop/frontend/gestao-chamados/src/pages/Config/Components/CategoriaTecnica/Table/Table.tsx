import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { ICategoriaTecnica } from "../../../../../interfaces/ICategoriaTecnica";

interface TableProps {
    data: ICategoriaTecnica[];
    onClickEdit: (categoria: ICategoriaTecnica) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data, onClickEdit, onClickDelete,/*  onClickToggle,  */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeCategoriaTecnica">
                        <p>Nome</p>
                    </th>
                    <th title="descricaoCategoriaTecnica">
                        <p>Descrição</p>
                    </th>
                    <th title="descricaoCategoriaTecnica ">
                        <p>Área</p>
                    </th>
                    <th title=" ">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((categoriaTecnica
                    : ICategoriaTecnica) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={categoriaTecnica?.name}>
                            <p>
                                {categoriaTecnica?.name}
                            </p>
                        </td>
                        <td title={categoriaTecnica?.description}>
                            <p>
                                {categoriaTecnica?.description}
                            </p>
                        </td>
                        <td title={categoriaTecnica?.areaLocationCover?.name}>
                            <p>
                                {categoriaTecnica?.areaLocationCover?.name}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(categoriaTecnica)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(String(categoriaTecnica?.id))} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
