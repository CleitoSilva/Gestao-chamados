import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";
import { ReactComponent as TrashIcon } from "../../../../assets/icons/octicon_trash-24.svg";

import { ITicketTechnique } from "../../../../interfaces/Tickets/ITicketTechnique";
import { GetTechColor } from "../../utils/functions/GetTechColor";
import { GetTechStatus } from "../../utils/functions/GetTechStatus";
import './TicketTrashTech.styles.css';
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";
import { useContext } from "react";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { RemoveTechniqueTicket } from "../../../../service/Ticket/RemoveTechniqueTicket";
import { TicketContext } from "../../contexts/TicketContext";

interface TicketTrashTechProps {
  idTicket: number;
  technique: ITicketTechnique;
  closeModal: () => void;
}

function TicketTrashTech({ idTicket, technique, closeModal }: TicketTrashTechProps) {
  const { notify } = useContext(NotificationContext);
  const { refreshTechniques, refreshEvents } = useContext(TicketContext);

  const handleRemoveTechnique = async () => {
    try {
      if (!technique) {
        notify.error("Nenhuma especialidade adicionada");
        return;
      }

      const resTech = await RemoveTechniqueTicket(idTicket, technique.idTechniqueCategory);

      if (resTech && resTech.data && resTech.data.message) {
        notify.success(resTech.data.message);
        refreshTechniques();
        refreshEvents();
      }

      closeModal();
    } catch(error) {
      notify.error("Erro ao remover especialidade ao chamado!")
    }
  }

  return (
    <section className="ticket-trash-tech-container">
      <TicketActionsButton 
        icon={<TrashIcon className="trash-icon" />}
        text="Excluir Especialidade"
        className="trash"
        onClick={closeModal}
      />
      <article className="ticket-trash-tech-content">
        <div key={technique.idTechniqueCategory + technique.idTicket} className="ticket-technique-item">
          <span>
            <h4>{technique.techniqueCategory?.name ?? "---"}</h4>
            <p style={{ background: GetTechColor(technique.serviceStatus) }}>{GetTechStatus(technique.serviceStatus)}</p>
          </span>
        </div>
        <TicketConfirmAction
          label={
            <p>
              Insira o número de seu crachá e posteriormente pressione em <strong>Confirmar</strong> para 
              excluir a especialidade do <strong>Chamado</strong>
            </p>
          }
          placeholder="Insira o número de seu crachá..."
          onSubmit={(card) => handleRemoveTechnique()}
          onCancel={closeModal}
        />
      </article>
    </section>
  );
}

export default TicketTrashTech;