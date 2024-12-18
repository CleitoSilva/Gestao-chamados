import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";
import { ReactComponent as ResponsibleIcon } from "../../../../assets/icons/mingcute_user-security-fill.svg";
import { ITicketColaborator } from "../../../../interfaces/Tickets/ITicketColaborator";
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";
import { useContext } from "react";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { TicketContext } from "../../contexts/TicketContext";
import { ChangeResponsibleTicket } from "../../../../service/Ticket/ChangeResponsibleTicket";

import "./TicketChangeResponsible.styles.css";

interface TicketChangeResponsibleProps {
  idTicket: number;
  colaborator: ITicketColaborator;
  closeModal: () => void;
}

function TicketChangeResponsible({ idTicket, colaborator, closeModal }: TicketChangeResponsibleProps) {

  const { notify } = useContext(NotificationContext);
  const { setIdResponsible, refreshEvents } = useContext(TicketContext);

  const handleChangeResponsible = async () => {
    try {
      if (!colaborator) {
        notify.error("Nenhuma colaborador adicionada");
        return;
      }

      const resTech = await ChangeResponsibleTicket(idTicket, colaborator.idColaborator);

      if (resTech && resTech.data && resTech.data.message) {
        notify.success(resTech.data.message);
        setIdResponsible(colaborator.idColaborator);
        refreshEvents();
      }

      closeModal();
    } catch(error) {
      notify.error("Erro ao remover colaborador ao chamado!")
    }
  }

  return (
    <section className="ticket-responsible-colaborator-container">
      <TicketActionsButton 
        icon={<ResponsibleIcon className="responsible-icon" />}
        text="Alterar Responsável"
        className="responsible"
        onClick={closeModal}
      />
      <article className="ticket-responsible-colaborator-content">
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
              alterar o colaborador responsável do <strong>Chamado</strong>
            </p>
          }
          placeholder="Insira o número de seu crachá..."
          onSubmit={() => handleChangeResponsible()}
          onCancel={closeModal}
        />
      </article>
    </section>
  );
}

export default TicketChangeResponsible;