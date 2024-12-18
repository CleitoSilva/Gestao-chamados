
import { FC } from "react";
import './Table.styles.css'
import { ICategoriaColaborador } from "../../../../../interfaces/ICategoriaColaborador";

interface TableProps {
    data: ICategoriaColaborador[];
    // onClickEdit: (empresa: IEmpresa) => void;
    // onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

export const Table: FC<TableProps> = ({ data  /* onClickDelete, , onClickToggle, onClickEdit, */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="nomecategoriaColaborador">
                        <p>Nome</p>
                    </th>
                    <th title="descricaocategoriaColaborador">
                        <p>Descrição</p>
                    </th>
                    <th title="tipoCategoria">
                        <p>Tipo</p>
                    </th>
                    <th title="empresa">
                        <p>Empresa</p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((categoriaColaborador: ICategoriaColaborador) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={categoriaColaborador?.name}>
                            <p>
                                {categoriaColaborador?.name}
                            </p>
                        </td>
                        <td title={categoriaColaborador?.description}>
                            <p>
                                {categoriaColaborador?.description}
                            </p>
                        </td>
                        <td title={categoriaColaborador?.typeCategory?.toString()}>
                            <p>
                                {categoriaColaborador.typeCategory !== undefined && categoriaColaborador?.typeCategory.toString()}
                            </p>
                        </td>
                        <td title={categoriaColaborador?.empresa?.nomeEmpresa}>
                            <p>
                                {categoriaColaborador?.empresa?.nomeEmpresa}
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
