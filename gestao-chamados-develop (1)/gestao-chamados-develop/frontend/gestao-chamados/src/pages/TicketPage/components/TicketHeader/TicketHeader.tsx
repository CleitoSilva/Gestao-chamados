import { GetTicketColor } from '../../utils/functions/GetTicketColor';
import { GetTicketStatus } from '../../utils/functions/GetTicketStatus';
import './TicketHeader.styles.css';

interface TicketHeaderProps {
  idTicket: number;
  statusTicket: number;
}

function TicketHeader({ idTicket, statusTicket }: TicketHeaderProps) {  
  return (
    <header className='ticket-header'>
      <h2>Chamado #{idTicket}</h2>
      <span className='ticket-status' style={{ background: GetTicketColor(statusTicket) }}>
        <div className='pin' />
        <p>{GetTicketStatus(statusTicket)}</p>
      </span>
    </header>
  );
}

export default TicketHeader;