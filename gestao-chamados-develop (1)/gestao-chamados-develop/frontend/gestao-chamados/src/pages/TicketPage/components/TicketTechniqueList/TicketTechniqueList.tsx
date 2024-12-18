import { ITicketTechnique } from "../../../../interfaces/Tickets/ITicketTechnique";
import { GetTechStatus } from "../../utils/functions/GetTechStatus";

import { ReactComponent as TrashIcon } from "../../../../assets/icons/octicon_trash-24.svg"

import './TicketTechniqueList.styles.css';
import { GetTechColor } from "../../utils/functions/GetTechColor";
import { Fragment } from "react/jsx-runtime";
import TicketModal from "../TicketModal/TicketModal";
import { useContext, useState } from "react";
import TicketTrashTech from "../TicketTrashTech/TicketTrashTech";
import { TicketContext } from "../../contexts/TicketContext";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";

interface TicketTechniqueListProps {
  idTicket: number;
  techniques: ITicketTechnique[];
}

function TicketTechniqueList({ idTicket, techniques }: TicketTechniqueListProps) {
  const { status } = useContext(TicketContext);

  const [showTrashTech, setShowTrashTech] = useState<boolean>(false);
  const [ticketTech, setTicketTech] = useState<ITicketTechnique>();

  return (
    <Fragment>
      <ul className="ticket-technique-list">
        {techniques.map(t => 
          <li key={t.idTechniqueCategory + t.idTicket} className="ticket-technique-item">
            <span>
              <h4>{t.techniqueCategory?.name ?? "---"}</h4>
              <p style={{ background: GetTechColor(t.serviceStatus) }}>{GetTechStatus(t.serviceStatus)}</p>
            </span>
            <button onClick={() => { setShowTrashTech(true); setTicketTech(t); }} disabled={status >= TicketStatus.CANCELED} >
              <TrashIcon />
            </button>
          </li>
        )}
      </ul>
      {ticketTech &&
        <TicketModal 
          idModal="ticket-tech-trash" 
          level={2} 
          showModal={showTrashTech} 
          closeModal={() => setShowTrashTech(false)}
        >
          <TicketTrashTech idTicket={idTicket} technique={ticketTech} closeModal={() => setShowTrashTech(false)} />
        </TicketModal>
      }
    </Fragment>
  );
}

export default TicketTechniqueList;