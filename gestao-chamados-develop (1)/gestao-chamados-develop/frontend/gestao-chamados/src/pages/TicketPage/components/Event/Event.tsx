import { Fragment } from "react/jsx-runtime";
import { IEvent } from "../../../../interfaces/Tickets/IEvent";
import { IEventChangeResponsibleMessage } from "../../interfaces/IEventChangeResponsibleMessage";
import { IEventColaboratorMessage } from "../../interfaces/IEventColaboratorMessage";
import { IEventOpenMessage } from "../../interfaces/IEventOpenMessage";
import { IEventStatusMessage } from "../../interfaces/IEventStatusMessage";
import { IEventTechniqueMessage } from "../../interfaces/IEventTechniqueMessage";
import { EventCode } from "../../utils/enums/EventCodeEnum";
import { GetTechStatus } from "../../utils/functions/GetTechStatus";
import { GetTicketStatus } from "../../utils/functions/GetTicketStatus";

import { ReactComponent as OpenIcon } from "../../../../assets/icons/majesticons_open.svg";
import { ReactComponent as ResponsibleIcon } from "../../../../assets/icons/mingcute_user-security-fill.svg";
import { ReactComponent as TechniqueIcon } from "../../../../assets/icons/ph_gear-six.svg";
import { ReactComponent as ColaboratorIcon } from "../../../../assets/icons/healthicons_construction-worker.svg";
import { ReactComponent as PlayIcon } from "../../../../assets/icons/fluent_play-24-filled.svg";
import { ReactComponent as PauseIcon } from "../../../../assets/icons/flowbite_pause-solid.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/mdi_cancel.svg";
import { ReactComponent as FinishIcon } from "../../../../assets/icons/mingcute_send-fill.svg";

import './Event.styles.css';
import { GetDateTimeLocale } from "../../utils/functions/GetDateTimeLocale";

interface EventProps {
  event: IEvent;
}

function Event({ event }: EventProps) {

  const handleOpenMessage = () => {
    let message: IEventOpenMessage = JSON.parse(event.message);

    return (
      <p>
        Aberto por <strong>{message.OpenBy ?? "---"}</strong>, 
        para a Área <strong>{message.AreaFor ?? "---"}</strong>, 
        para subárea <strong>{message.SubAreaFor ?? "---"}</strong>, 
        na linha <strong>{message.LineFor ?? "---"}</strong>, 
        máquina <strong>{message.MachineFor ?? "---"}</strong> e 
        componente <strong>{message.ComponentFor ?? "---"}</strong>
      </p>
    );
  }

  const handleAddTechniqueMessage = () => {
    let message: IEventTechniqueMessage = JSON.parse(event.message);

    return (
      <p>
        Especialidade técnica <strong>{message.NameTech ?? "---"}</strong> adicionada ao 
        chamado, cuja área de abrangência é <strong>{message.AreaTech ?? "---"}</strong> e 
        com status <strong>{GetTechStatus(message.StatusTech ?? 0)}</strong>
      </p>
    );
  }

  const handleRemoveTechniqueMessage = () => {
    let message: IEventTechniqueMessage = JSON.parse(event.message);

    return (
      <p>
        Especialidade técnica <strong>{message.NameTech ?? "---"}</strong> removida 
        do chamado
      </p>
    );
  }

  const handleStatusMessage = () => {
    let message: IEventStatusMessage = JSON.parse(event.message);

    return (
      <p>
        Chamado estava <strong>{GetTicketStatus(message.LastStatus)}</strong> e 
        foi passado para <strong>{GetTicketStatus(message.NewStatus)}</strong>
      </p>
    );
  }

  const handleResponsibleMessage = () => {
    let message: IEventChangeResponsibleMessage = JSON.parse(event.message);

    return (
      <p>
        Responsável técnico do chamado: <strong>{message.NewResponsible}</strong>
      </p>
    );
  }

  const handleAddColaboratorMessage = () => {
    let message: IEventColaboratorMessage = JSON.parse(event.message);

    return (
      <p>
        Técnico adicionado ao chamado <strong>{message.Name}</strong> com 
        especialidade em <strong>{message.TechniqueCategory}</strong>
      </p>
    );
  }

  const handleRemoveColaboratorMessage = () => {
    let message: IEventColaboratorMessage = JSON.parse(event.message);

    return (
      <p>
        Técnico realizando saída do chamado <strong>{message.Name}</strong> com 
        especialidade em <strong>{message.TechniqueCategory}</strong>
      </p>
    );
  }

  const handleMessage = () => { 
    switch(event.code) {
      case EventCode.OPEN:
        return handleOpenMessage();
      case EventCode.CHANGERESPONSIBLE: 
        return handleResponsibleMessage();
      case EventCode.NEWCOLABORATOR:
        return handleAddColaboratorMessage();
      case EventCode.REMOVECOLABORATOR: 
        return handleRemoveColaboratorMessage();
      case EventCode.NEWESPECIALITY:
        return handleAddTechniqueMessage();
      case EventCode.REMOVEESPECIALITY:
        return handleRemoveTechniqueMessage();
      case EventCode.STARTRUN:
        return handleStatusMessage();
      case EventCode.PAUSE:
        return handleStatusMessage();
      case EventCode.CANCELED:
        return handleStatusMessage();
      case EventCode.REINITIALIZE:
        return handleStatusMessage();
      case EventCode.FINISH:
        return handleStatusMessage();
      default:
        return <p />
    }
  }

  const handleIcon = () => {
    switch(event.code) {
      case EventCode.OPEN:
        return <OpenIcon />;
      case EventCode.CHANGERESPONSIBLE: 
        return <ResponsibleIcon />;
      case EventCode.NEWCOLABORATOR:
        return <ColaboratorIcon />;
      case EventCode.REMOVECOLABORATOR: 
        return <ColaboratorIcon />;
      case EventCode.NEWESPECIALITY:
        return <TechniqueIcon />;
      case EventCode.REMOVEESPECIALITY:
        return <TechniqueIcon />;
      case EventCode.STARTRUN:
        return <PlayIcon />;
      case EventCode.PAUSE:
        return <PauseIcon />;
      case EventCode.CANCELED:
        return <CancelIcon />;
      case EventCode.REINITIALIZE:
        return <PlayIcon />;
      case EventCode.FINISH:
        return <FinishIcon />;
      default:
        return <i />;
    }
  }

  const handleDate = (timestamp: string) => {
    try {
      let date = new Date(timestamp);

      let convertedDate = GetDateTimeLocale(date);

      return convertedDate.toLocaleString();
    } catch(error) {
      return "dd/MM/yyyy HH:mm:ss";
    }
  }

  return (
    <div className="event-item">
      <aside>
        {handleIcon()}
      </aside>
      <span className="event-item-name">
        <h4>{event.name}</h4>
        <p>por {event.userCreate}</p>
      </span>
      <Fragment>
        {handleMessage()}
      </Fragment>
      <span className="event-item-ts">
        <h5>{handleDate(event.timestamp)}</h5>
      </span>
    </div>
  );
}

export default Event;