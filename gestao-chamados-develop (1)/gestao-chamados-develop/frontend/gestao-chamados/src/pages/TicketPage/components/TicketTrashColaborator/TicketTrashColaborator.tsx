import { ITicketColaborator } from "../../../../interfaces/Tickets/ITicketColaborator";
import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";

import { ReactComponent as LeftIcon } from "../../../../assets/icons/ic_round-log-out.svg";

import { useContext } from "react";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { RemoveColaboratorTicket } from "../../../../service/Ticket/RemoveColaboratorTicket";
import { TicketContext } from "../../contexts/TicketContext";
import './TicketTrashColaborator.styles.css';

interface TicketTrashColaboratorProps {
  idTicket: number;
  colaborator: ITicketColaborator;
  closeModal: () => void;
}

function TicketTrashColaborator({ idTicket, colaborator, closeModal }: TicketTrashColaboratorProps) {
  const { notify } = useContext(NotificationContext);
  const { refreshColaborators, refreshEvents, refreshTechniques } = useContext(TicketContext);

  const handleRemoveColoborator = async () => {
    try {
      if (!colaborator) {
        notify.error("Nenhuma colaborador adicionada");
        return;
      }

      const resTech = await RemoveColaboratorTicket(idTicket, colaborator.idColaborator);

      if (resTech && resTech.data && resTech.data.message) {
        notify.success(resTech.data.message);
        refreshColaborators();
        refreshEvents();
        refreshTechniques();
      }

      closeModal();
    } catch(error) {
      notify.error("Erro ao remover colaborador ao chamado!")
    }
  }

  return (
    <section className="ticket-trash-colaborator-container">
      <TicketActionsButton 
        icon={<LeftIcon className="trash-icon" />}
        text="Dar Saída no Chamado"
        className="trash"
        onClick={closeModal}
      />
      <article className="ticket-trash-colaborator-content">
        <div key={colaborator.idColaborator + colaborator.idTicket} className="ticket-colaborator-item">
          <span>
            <h4>{colaborator.colaborator?.name ?? "---"}</h4>
            <p>{colaborator.colaborator?.techniqueCategory?.name ?? "---"}</p>
          </span>
        </div>
        <TicketConfirmAction
          label={
            <p>
              Insira o número de seu crachá e posteriormente pressione em <strong>Confirmar</strong> para 
              dar saída do colaborador no <strong>Chamado</strong>
            </p>
          }
          placeholder="Insira o número de seu crachá..."
          onSubmit={() => handleRemoveColoborator()}
          onCancel={closeModal}
        />
      </article>
    </section>
  );
}

export default TicketTrashColaborator;