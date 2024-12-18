import { ITicketColaborator } from "../../../../interfaces/Tickets/ITicketColaborator";
import TicketButton from "../TicketButton/TicketButton";
import TicketColaboratorList from "../TicketColaboratorList/TicketColaboratorList";
import { ReactComponent as ColaboratorIcon } from "../../../../assets/icons/healthicons_construction-worker.svg";

import TicketModal from "../TicketModal/TicketModal";
import { useContext, useState } from "react";
import TicketAddColaborators from "../TicketAddColaborator/TicketAddColaborator";
import { TicketContext } from "../../contexts/TicketContext";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";

import './TicketColaboratorAction.styles.css';

interface TicketColaboratorActionProps {
  idTicket: number;
  colaborators: ITicketColaborator[];
}

function TicketColaboratorAction({ idTicket, colaborators }: TicketColaboratorActionProps) {
  const { status } = useContext(TicketContext);
  const [showAddColaborator, setShowAddColaborator] = useState<boolean>(false);

  return (
    <div className="ticket-coloborators-action-area">
      <TicketColaboratorList idTicket={idTicket} colaborators={colaborators} />
      <TicketButton 
        className="get-in-ticket-button" 
        icon={<ColaboratorIcon className="button-default-icon" />} 
        text="Entrar no chamado" 
        onClick={() => setShowAddColaborator(true)}
        disabled={status >= TicketStatus.CANCELED} 
      />
      <TicketModal
        level={2}
        idModal="ticket-add-colaborator"
        showModal={showAddColaborator}
        closeModal={() => setShowAddColaborator(false)}
      >
        <TicketAddColaborators idTicket={idTicket} closeModal={() => setShowAddColaborator(false)} />
      </TicketModal>
    </div>
  );
}

export default TicketColaboratorAction;