import { ITicketColaborator } from "../../../../interfaces/Tickets/ITicketColaborator";

import { ReactComponent as LeftIcon } from "../../../../assets/icons/ic_round-log-out.svg";
import { ReactComponent as ResponsibleIcon } from "../../../../assets/icons/mingcute_user-security-fill.svg";
import { ReactComponent as ShieldIcon } from "../../../../assets/icons/clarity_shield-solid.svg";

import { Fragment } from "react/jsx-runtime";
import TicketTrashColaborator from "../TicketTrashColaborator/TicketTrashColaborator";
import { useContext, useState } from "react";
import TicketModal from "../TicketModal/TicketModal";
import { TicketContext } from "../../contexts/TicketContext";
import TicketChangeResponsible from "../TicketChangeResponsible/TicketChangeResponsible";

import './TicketColaboratorList.styles.css';
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";

interface TicketColaboratorListProps {
  idTicket: number;
  colaborators: ITicketColaborator[];
}

function TicketColaboratorList({ idTicket, colaborators }: TicketColaboratorListProps) {
  const { idResponsible, status } = useContext(TicketContext);

  const [showTrashColaborator, setShowTrashColaborator] = useState<boolean>(false);
  const [showResponsibleColaborator, setShowResponsibleColaborator] = useState<boolean>(false);
  const [ticketColaborator, setTicketColaborator] = useState<ITicketColaborator>();

  const ColaboratorItem = (c: ITicketColaborator | undefined) => {
    if (!c) return <Fragment />;

    return (
      <li key={c.idColaborator + c.idTicket} className="ticket-colaborator-item">
        <span>
          {idResponsible === c.idColaborator && <ShieldIcon />}
          <h4>{c.colaborator?.name ?? "---"}</h4>
          <p>{c.colaborator?.techniqueCategory?.name ?? "---"}</p>
        </span>
        <div className="ticket-colaborator-buttons">
          {!(idResponsible === c.idColaborator) &&
            <Fragment>
              <button onClick={() => { setShowResponsibleColaborator(true); setTicketColaborator(c); }} disabled={status >= TicketStatus.CANCELED}>
                <ResponsibleIcon />
              </button>
              <button onClick={() => { setShowTrashColaborator(true); setTicketColaborator(c); }} disabled={status >= TicketStatus.CANCELED}>
                <LeftIcon />
              </button>
            </Fragment>
          }
        </div>
      </li>
    );
  }

  return (
    <Fragment>
      <ul className="ticket-colaborator-list">
        {ColaboratorItem(colaborators.find(x => x.idColaborator === idResponsible))}
        {colaborators.map(c => 
          <Fragment>
            {c.idColaborator !== idResponsible && ColaboratorItem(c)}
          </Fragment>
        )}
      </ul>
      {ticketColaborator &&
      <Fragment>
        <TicketModal
          idModal="ticket-colaborator-responsible" 
          level={2} 
          showModal={showResponsibleColaborator} 
          closeModal={() => setShowResponsibleColaborator(false)}
        >
          <TicketChangeResponsible 
            idTicket={idTicket}
            colaborator={ticketColaborator}
            closeModal={() => setShowResponsibleColaborator(false)}
          />
        </TicketModal>

        <TicketModal
          idModal="ticket-colaborator-trash" 
          level={2} 
          showModal={showTrashColaborator} 
          closeModal={() => setShowTrashColaborator(false)}
        >
          <TicketTrashColaborator 
            idTicket={idTicket}
            colaborator={ticketColaborator}
            closeModal={() => setShowTrashColaborator(false)}
          />
        </TicketModal>
      </Fragment>
      }
    </Fragment>
  );
}

export default TicketColaboratorList;