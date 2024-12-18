import { ReactElement } from "react";
import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";

import './TicketChangeStatus.styles.css';
import { IColaborador } from "../../../../interfaces/IColaborador";

interface TicketChangeStatusProps {
  icon: ReactElement;
  text: string;
  label: ReactElement;
  onSubmit: (colaborator: IColaborador) => void;
  closeModal: () => void;
}

function TicketChangeStatus({ icon, text, label, onSubmit, closeModal }: TicketChangeStatusProps) {
  return (
    <section className="ticket-change-status-container">
      <TicketActionsButton 
        icon={icon}
        text={text}
        className="btn-change-status"
        onClick={closeModal}
      />
      <article className="ticket-change-status-content">
        <TicketConfirmAction 
          label={label}
          placeholder="Insira o número de seu crachá..."
          onSubmit={(colaborator) => onSubmit(colaborator)}
          onCancel={closeModal}
        />
      </article>
    </section>
  );
}

export default TicketChangeStatus;