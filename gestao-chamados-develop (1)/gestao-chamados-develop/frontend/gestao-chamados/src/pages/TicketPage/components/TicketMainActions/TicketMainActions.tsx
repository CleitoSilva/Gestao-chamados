import { Fragment, useContext, useState } from "react";
import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";

import './TicketMainActions.styles.css';
import { TabOptionsActions } from "../../utils/enums/TabOptionsActionsEnum";
import { ITicket } from "../../../../interfaces/Tickets/ITicket";
// import TicketButton from "../TicketButton/TicketButton";

// import { ReactComponent as PlayIcon } from "../../../../assets/icons/fluent_play-24-filled.svg";
// import { ReactComponent as PauseIcon } from "../../../../assets/icons/flowbite_pause-solid.svg";
// import { ReactComponent as CancelIcon } from "../../../../assets/icons/mdi_cancel.svg";
// import { ReactComponent as FinishIcon } from "../../../../assets/icons/mingcute_send-fill.svg";
import { ReactComponent as ActionsIcon } from '../../../../assets/icons/material-symbols_note-stack-outline.svg';

import TicketColaboratorAction from "../TicketColaboratorAction/TicketColaboratorAction";
import TicketTechniqueAction from "../TicketTechniqueAction/TicketTechniqueAction";
import TicketStatusButtons from "../TicketStatusButtons/TicketStatusButtons";
import { TicketContext } from "../../contexts/TicketContext";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";
import TicketNeedsToRun from "../TicketNeedsToRun/TicketNeedsToRun";

interface TicketMainActionsProps {
  closeModal: () => void;
}

function TicketMainActions({ closeModal }: TicketMainActionsProps) {
  const { idTicket, colaborators, techniques, status } = useContext(TicketContext);

  const [selectedTab, setSelectedTab] = useState<number>(TabOptionsActions.COLABORATOR);

  const handleList = () => {
    switch(selectedTab) {
      case TabOptionsActions.COLABORATOR: 
        return <TicketColaboratorAction idTicket={idTicket} colaborators={colaborators} />
      case TabOptionsActions.TECHNIQUE:
        return <TicketTechniqueAction idTicket={idTicket} techniques={techniques} />
    }
  }

  return (
    <main className="ticket-main-actions">
      <TicketActionsButton 
        text="Ações do Chamado" 
        icon={<ActionsIcon />}
        onClick={closeModal} 
      /> 
      {status === TicketStatus.OPEN ?
        <Fragment>
          <TicketNeedsToRun />
        </Fragment>
        :
        <article className="ticket-actions-content">
          <div className="ticket-status-buttons">
            <TicketStatusButtons idTicket={idTicket} ticketStatus={status} />
          </div>
          <div className="ticket-actions-button">
            <button 
              className={selectedTab === TabOptionsActions.COLABORATOR ? "selected" : ""} 
              onClick={() => setSelectedTab(TabOptionsActions.COLABORATOR)}
            >
              Colaboradores
            </button>
            <button 
              className={selectedTab === TabOptionsActions.TECHNIQUE ? "selected" : ""}
              onClick={() => setSelectedTab(TabOptionsActions.TECHNIQUE)}
            >
              Especialidades
            </button>
          </div>
          <Fragment>
            {handleList()}
          </Fragment>
        </article>
      }
    </main>
  );
}

export default TicketMainActions;