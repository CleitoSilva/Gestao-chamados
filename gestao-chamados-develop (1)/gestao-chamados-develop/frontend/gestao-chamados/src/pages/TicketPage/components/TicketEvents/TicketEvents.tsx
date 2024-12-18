import { IEvent } from "../../../../interfaces/Tickets/IEvent";
import Event from "../Event/Event";

import './TicketEvents.styles.css';

interface TicketEventsProps {
  events: IEvent[];
}

function TicketEvents({ events }: TicketEventsProps) {
  return (
    <ul className="events-list">
      {events.map(e => 
        <li key={e.id + e.idTicket}>
          <Event event={e} />
        </li>
      )}
    </ul>
  );
}

export default TicketEvents;