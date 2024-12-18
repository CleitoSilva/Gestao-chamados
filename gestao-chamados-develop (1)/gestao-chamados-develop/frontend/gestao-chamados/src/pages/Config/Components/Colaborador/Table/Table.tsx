import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { IColaborador } from "../../../../../interfaces/IColaborador";

interface TableProps {
    data: IColaborador[];
    onClickEdit: (colaborador: IColaborador) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data,  onClickDelete, onClickEdit/*   onClickToggle, , */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomeColaborador">
                        <p>Nome</p>
                    </th>
                    {/* <th title="categoriaColaborador">
                        <p>Categoria</p>
                    </th> */}
                    <th title="categoriaTecnincaColaborador">
                        <p>Categoria Técnica</p>
                    </th>
                    <th title="turno">
                        <p>Turno</p>
                    </th>
                    <th title="linha">
                        <p>Linha</p>
                    </th>
                    <th title="cartaoRFID">
                        <p>RFID</p>
                    </th>
                    <th title="cartaoCracha">
                        <p>Crachá</p>
                    </th>
                    <th title="reColaborador">
                        <p>RE</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((colaborador: IColaborador) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={colaborador?.name}>
                            <p>
                                {colaborador?.name}
                            </p>
                        </td>
                        {/* <td title={colaborador?.categoriaColaborador?.name}>
                            <p>
                                {colaborador?.categoriaColaborador?.name}
                            </p>
                        </td> */}
                        <td title={colaborador?.techniqueCategory?.name}>
                            <p>
                                {colaborador?.techniqueCategory?.name}
                            </p>
                        </td>
                        <td title={colaborador?.shift?.description}>
                            <p>
                                {colaborador?.shift?.description}
                            </p>
                        </td>
                        <td title={colaborador?.line?.name}>
                            <p>
                                {colaborador?.line?.name}
                            </p>
                        </td>
                        <td title={colaborador?.rfidCardNumber}>
                            <p>
                                {colaborador?.rfidCardNumber}
                            </p>
                        </td>
                        <td title={colaborador?.badgeCardNumber}>
                            <p>
                                {colaborador?.badgeCardNumber}
                            </p>
                        </td>
                        <td title={colaborador?.reNumber}>
                            <p>
                                {colaborador?.reNumber}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(colaborador)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(String(colaborador?.id))} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
