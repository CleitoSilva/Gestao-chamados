import { useContext, useState } from "react";
import { ReactComponent as NeedToRunIcon } from "../../../../assets/icons/carbon_tool-kit.svg";
import TicketModal from "../TicketModal/TicketModal";

import './TicketNeedsToRun.styles.css';
import TicketChangeStatus from "../TicketChangeStatus/TicketChangeStatus";
import { TicketContext } from "../../contexts/TicketContext";
import { StartTicket } from "../../../../service/Ticket/StartTicket";
import { IColaborador } from "../../../../interfaces/IColaborador";
import { NotificationContext } from "../../../../contexts/NotificationContext";

function TicketNeedsToRun() {
  const { notify } = useContext(NotificationContext);
  const { 
    idTicket, 
    refreshEvents, 
    refreshStatus, 
    refreshColaborators, 
    refreshTechniques, 
    setIdResponsible 
  } = useContext(TicketContext);

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);

  const handleStartTicket = async (colaborator: IColaborador) => {
    try {
      const resFinish = await StartTicket(idTicket, colaborator.id);

      if (resFinish && resFinish.data && resFinish.data.message) {
        notify.success(resFinish.data.message);
        
        refreshStatus();
        refreshEvents();
        refreshColaborators();
        refreshTechniques();
        setIdResponsible(colaborator.id);
      }

      setShowStatusModal(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao iniciar o chamado!");
    }
  }

  return (
    <article className="ticket-needs-to-run-container">
      <button onClick={() => setShowStatusModal(true)} className="start-run-open-modal">
        <NeedToRunIcon />
        <h2>CLIQUE AQUI PARA<br />INICIAR O CHAMADO</h2>
      </button>
      <TicketModal
        level={2}
        idModal="ticket-change-status-modal"
        showModal={showStatusModal}
        closeModal={() => setShowStatusModal(false)}
      >
        <TicketChangeStatus 
          text="Iniciar Chamado"
          label={
            <p>
              Insira o número de seu crachá e posteriormente 
              pressione em <strong>Confirmar</strong> para iniciar o chamado
            </p>
          }
          icon={<NeedToRunIcon />}
          onSubmit={(colaborator) => handleStartTicket(colaborator)}
          closeModal={() => setShowStatusModal(false)}
        />
      </TicketModal>
    </article>
  );
}

export default TicketNeedsToRun;