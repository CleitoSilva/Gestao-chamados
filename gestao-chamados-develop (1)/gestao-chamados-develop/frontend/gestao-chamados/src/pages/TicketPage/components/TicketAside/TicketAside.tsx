import { Fragment, useContext, useState } from "react";
import { TicketContext } from "../../contexts/TicketContext";
import TicketStatusButtons from "../TicketStatusButtons/TicketStatusButtons";
import { TabOptionsActions } from "../../utils/enums/TabOptionsActionsEnum";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";
import TicketNeedsToRun from "../TicketNeedsToRun/TicketNeedsToRun";

import TicketColaboratorList from "../TicketColaboratorList/TicketColaboratorList";
import TicketTechniqueList from "../TicketTechniqueList/TicketTechniqueList";
import TicketButton from "../TicketButton/TicketButton";
import TicketAddColaborators from "../TicketAddColaborator/TicketAddColaborator";

import { ReactComponent as ColaboratorIcon } from "../../../../assets/icons/healthicons_construction-worker.svg";
import { ReactComponent as TechniqueIcon } from "../../../../assets/icons/ph_gear-six.svg";

import "./TicketAside.styles.css";
import TicketModal from "../TicketModal/TicketModal";
import TicketAddTechnique from "../TicketAddTechnique/TicketAddTechnique";

function TicketAside() {
  const { idTicket, colaborators, techniques, status } = useContext(TicketContext);

  const [selectedTab, setSelectedTab] = useState<number>(TabOptionsActions.COLABORATOR);
  const [showAddColaborator, setShowAddColaborator] = useState<boolean>(false);
  const [showAddTech, setShowAddTech] = useState<boolean>(false);

  const handleList = () => {
    switch(selectedTab) {
      case TabOptionsActions.COLABORATOR: 
        return <TicketColaboratorList idTicket={idTicket} colaborators={colaborators} />
      case TabOptionsActions.TECHNIQUE:
        return <TicketTechniqueList idTicket={idTicket} techniques={techniques} />
    }
  }

  return (
    <main className="ticket-aside-main-actions">
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
          <div className="ticket-add-buttons-area">
            <TicketButton 
              className="ticket-add-button-aside" 
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

            <TicketButton 
              className="ticket-add-button-aside" 
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
        </article>
      }
    </main>
  );
}

export default TicketAside;