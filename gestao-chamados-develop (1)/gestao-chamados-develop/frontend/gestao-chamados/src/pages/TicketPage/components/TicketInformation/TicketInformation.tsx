import { ITicket } from "../../../../interfaces/Tickets/ITicket";
import { ReactComponent as OpenProduce } from '../../../../assets/icons/material-symbols_order-approve.svg';
import './TicketInformation.styles.css';

interface TicketInformationProps {
  ticket: ITicket;
}

function TicketInformation({ ticket }: TicketInformationProps) {
  return (
    <article className="ticket-information-area">
      <div className="ticket-open-colaborator">
        <i>
          <OpenProduce />
        </i>
        <h3>{ticket.openColaborator?.name}</h3>
      </div>
      <ul className="ticket-info-list">
        <li>
          <h5>Área</h5>
          <h4>{ticket.area?.name}</h4>
        </li>
        <li>
          <h5>Subárea</h5>
          <h4>{ticket.subArea?.name}</h4>
        </li>
        <li>
          <h5>Linha</h5>
          <h4>{ticket.line?.name}</h4>
        </li>
        <li>
          <h5>Máquina</h5>
          <h4>{ticket.machine?.name}</h4>
        </li>
        <li>
          <h5>Componente</h5>
          <h4>{ticket.component?.name}</h4>
        </li>
      </ul>
    </article>
  );
}

export default TicketInformation;