import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { Button, Toggle } from "../../../../../components";
import { FC } from "react";
import './Table.styles.css'
import { ITurno } from "../../../../../interfaces/ITurno";
import { parse, differenceInHours, differenceInMinutes } from 'date-fns';
import moment from "moment";
import { start } from "repl";

interface TableProps {
    data: ITurno[];
    onClickEdit: (turno: ITurno) => void;
    onClickDelete: (id: string) => void
    // onClickToggle: (empresa: IEmpresa) => void;
}

function formatarHora(hora: string): string {
    if (hora !== undefined) {
        const partes = hora.split(':');
        return `${partes[0]}:${partes[1]}`;
    }

    return "";
}

const calcularDuracao = (start: string, end: string) => {
    if ((start !== null && start !== undefined) && (end !== null && end !== undefined)) {
        const startTurno = moment(start, "HH:mm");
        const endTurno = moment(end, "HH:mm");

        // Se o horário de início for maior que o horário de término, adicionamos um dia ao horário de término
        if (endTurno.isBefore(startTurno)) {
            endTurno.add(1, 'day');
        }

        const diffMinutes = endTurno.diff(startTurno, 'minutes');
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        // Formatar como HH:MM
        const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        console.log(formattedDuration);

        return formattedDuration;
    }

    return "";
}

export const Table: FC<TableProps> = ({ data, onClickEdit, onClickDelete,/*, , onClickToggle,  */ }) => {

    return (
        <table className="lines_config-table">
            <thead className="config-table-head">
                <tr>
                    <th title="descricaoArea">
                        <p>Descrição</p>
                    </th>
                    <th title="nomeArea">
                        <p>Início</p>
                    </th>
                    <th title="area">
                        <p>Fim</p>
                    </th>
                    <th title="duracao">
                        <p>Duração</p>
                    </th>
                    <th title="">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody className="config-table-body">
                {data?.map((turno: ITurno) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td title={turno?.description}>
                            <p>
                                {turno?.description}
                            </p>
                        </td>
                        <td title={turno?.startHour}>
                            <p>
                                {formatarHora(turno?.startHour)}
                            </p>
                        </td>
                        <td title={turno?.endHour}>
                            <p>
                                {formatarHora(turno?.endHour)}
                            </p>
                        </td>
                        <td title={calcularDuracao(turno?.startHour, turno?.endHour)}>
                            <p>
                                {calcularDuracao(turno?.startHour, turno?.endHour)}
                            </p>
                        </td>
                        {/* <td title="Alterar Status" className="status-table-data">
                            <Toggle
                                onClick={() => onClickToggle({ ...empresa, status: !empresa?.status })}
                                active={line?.status}
                            />
                        </td> */}
                        <td>
                            <Button title="Editar" onClick={() => onClickEdit(turno)}>
                                <PiPencil size={24} />
                            </Button>
                            <Button title="Excluir" onClick={() => onClickDelete(turno?.id)} theme="error">
                                <TbTrash size={24} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
