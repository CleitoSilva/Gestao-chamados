import { ReactNode, createContext, useContext, useState } from "react";
import { IEvent } from "../../../interfaces/Tickets/IEvent";
import { ITicket } from "../../../interfaces/Tickets/ITicket";
import { ITicketColaborator } from "../../../interfaces/Tickets/ITicketColaborator";
import { ITicketTechnique } from "../../../interfaces/Tickets/ITicketTechnique";
import { GetTicketById } from "../../../service/Ticket/GetTicketById";
import { GetEventsByTicket } from "../../../service/Ticket/GetEventsByTicket";
import { NotificationContext } from "../../../contexts/NotificationContext";
import { GetStatusByTicket } from "../../../service/Ticket/GetStatusByTicket";
import { GetColaboratorsByTicket } from "../../../service/Ticket/GetColaboratorsByTicket";
import { GetTechniquesByTicket } from "../../../service/Ticket/GetTechniquesByTicket";
import { IColaborador } from "../../../interfaces/IColaborador";

interface ITicketContext {
  idTicket: number;
  idResponsible: number | undefined;
  ticket: ITicket | undefined;
  status: number;
  events: IEvent[];
  techniques: ITicketTechnique[];
  colaborators: ITicketColaborator[];

  workingColaborator: IColaborador | undefined; 

  getTicket: (idTicket: number) => Promise<void>;
  refreshEvents: () => Promise<void>;
  refreshStatus: () => Promise<void>;
  refreshTechniques: () => Promise<void>;
  refreshColaborators: () => Promise<void>;

  setIdResponsible: (newIdResponsible: number | undefined) => void;
  setWorkingColaborator: (colaborator: IColaborador | undefined) => void;
}

interface ITicketProvider {
  children: ReactNode;
}

export const TicketContext = createContext<ITicketContext>({
  idTicket: 0,
  idResponsible: 0,
  ticket: undefined,
  status: 0,
  events: [],
  techniques: [],
  colaborators: [],

  workingColaborator: undefined,

  getTicket: async () => {},
  refreshEvents: async () => {},
  refreshStatus: async () => {},
  refreshTechniques: async () => {},
  refreshColaborators: async () => {},

  setIdResponsible: () => {},
  setWorkingColaborator: () => {}
});

export const TicketProvider: React.FC<ITicketProvider> = ({ children }) => {
  const { notify } = useContext(NotificationContext);

  const [idTicket, setIdTicket] = useState<number>(0);
  const [ticket, setTicket] = useState<ITicket>();
  const [status, setStatus] = useState<number>(0);
  const [idResponsible, setIdResponsible] = useState<number>();

  const [workingColaborator, setWorkingColaborator] = useState<IColaborador>();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [techniques, setTechniques] = useState<ITicketTechnique[]>([]);
  const [colaboratos, setColaborators] = useState<ITicketColaborator[]>([]);

  const getTicket = async (idTicket: number) => {
    setIdTicket(idTicket);

    const resTicket = await GetTicketById(idTicket);

    if (resTicket && resTicket.data) {
      setTicket(resTicket.data.payload);
      setEvents(resTicket.data.payload.events);
      setStatus(resTicket.data.payload.status);
      setIdResponsible(resTicket.data.payload.idResponsibleManutentor);
      setTechniques(resTicket.data.payload.techniques);
      setColaborators(resTicket.data.payload.colaborators);
    }
  }

  const refreshEvents = async () => {
    const resEvents = await GetEventsByTicket(idTicket);

    if (resEvents && resEvents.data && resEvents.data.payload) 
      setEvents(resEvents.data.payload);
    else
      notify.error("Não foi possível atualizar os eventos");
  }

  const refreshStatus = async () => {
    const resStatus = await GetStatusByTicket(idTicket);

    if (resStatus && resStatus.data && resStatus.data.payload) 
      setStatus(resStatus.data.payload.status);
    else
      notify.error("Não foi possível atualizar o status");
  }

  const refreshColaborators = async () => {
    const resColaborators = await GetColaboratorsByTicket(idTicket);

    if (resColaborators && resColaborators.data && resColaborators.data.payload) 
      setColaborators(resColaborators.data.payload);
    else
      notify.error("Não foi possível atualizar os colaboradores");
  }

  const refreshTechniques = async () => {
    const resTechniques = await GetTechniquesByTicket(idTicket);

    if (resTechniques && resTechniques.data && resTechniques.data.payload) 
      setTechniques(resTechniques.data.payload);
    else
      notify.error("Não foi possível atualizar as especialidades");
  }

  return (
    <TicketContext.Provider
      value={{ 
        idTicket: idTicket,
        idResponsible: idResponsible,
        ticket: ticket,
        status: status,
        events: events,
        techniques: techniques,
        colaborators: colaboratos,
        workingColaborator: workingColaborator,
        getTicket: getTicket,
        refreshEvents: refreshEvents,
        refreshStatus: refreshStatus,
        refreshColaborators: refreshColaborators,
        refreshTechniques: refreshTechniques,
        setIdResponsible: setIdResponsible,
        setWorkingColaborator: setWorkingColaborator
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}