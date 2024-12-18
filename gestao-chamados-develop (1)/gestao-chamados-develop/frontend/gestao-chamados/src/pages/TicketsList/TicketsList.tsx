import { useEffect, useState } from "react";
import { GetAllTickets } from "../../service/Ticket";
import { ITicket } from "../../interfaces/Tickets/ITicket";
import { useNavigate } from "react-router-dom";

function TicketsList() {
  const navigate = useNavigate();
  
  const [forceNotOverload, setForceNotOverload] = useState<boolean>(false);
  const [tickets, setTickets] = useState<ITicket[]>();
  
  useEffect(() => setForceNotOverload(true), []);

  const fetchTickets = async () => {
    const resTickets = await GetAllTickets();

    if (resTickets && resTickets.data)
      setTickets(resTickets.data.payload);
  }

  useEffect(() => {
    if (forceNotOverload)
      fetchTickets();
  }, [forceNotOverload])

  return (
    <main className="ticket-list-container">
      <ul>
        {tickets?.map(t => 
          <li>
            <span>{t.id}</span>
            <button onClick={() => navigate(`/ticket/${t.id}`)}>Navigate</button>
          </li>
        )}
      </ul>
    </main>
  );
}

export default TicketsList;