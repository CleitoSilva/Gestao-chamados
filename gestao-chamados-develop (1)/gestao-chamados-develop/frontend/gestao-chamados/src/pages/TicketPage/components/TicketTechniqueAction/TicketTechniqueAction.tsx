import TicketButton from "../TicketButton/TicketButton";
import TicketTechniqueList from "../TicketTechniqueList/TicketTechniqueList";

import { ReactComponent as TechniqueIcon } from "../../../../assets/icons/ph_gear-six.svg";
import { ITicketTechnique } from "../../../../interfaces/Tickets/ITicketTechnique";

import './TicketTechniqueAction.styles.css';
import TicketModal from "../TicketModal/TicketModal";
import TicketAddTechnique from "../TicketAddTechnique/TicketAddTechnique";
import { useContext, useState } from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";

interface TicketTechniqueActionProps {
  idTicket: number;
  techniques: ITicketTechnique[];
}

function TicketTechniqueAction({ idTicket, techniques }: TicketTechniqueActionProps) {
  const { status } = useContext(TicketContext);
  const [showAddTech, setShowAddTech] = useState<boolean>(false);

  return (
    <div className="ticket-technique-action-area">
      <TicketTechniqueList idTicket={idTicket} techniques={techniques} />
      <TicketButton 
        className="speciality-ticket-button" 
        icon={<TechniqueIcon className="button-default-icon" />} 
        text="Adicionar Especialidade"
        onClick={() => setShowAddTech(true)} 
        disabled={status >= TicketStatus.CANCELED} 
      />
      <TicketModal
        level={2}
        idModal="ticket-add-technique"
        showModal={showAddTech}
        closeModal={() => setShowAddTech(false)}
      >
        <TicketAddTechnique idTicket={idTicket} closeModal={() => setShowAddTech(false)} />
      </TicketModal>
    </div>
  );
}

export default TicketTechniqueAction;