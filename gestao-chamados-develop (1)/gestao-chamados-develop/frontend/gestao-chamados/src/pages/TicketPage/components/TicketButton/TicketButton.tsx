import { ReactElement } from "react";

import './TicketButton.styles.css';

interface TicketButtonProps {
  icon: ReactElement;
  className?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function TicketButton({ icon, className, text, onClick, disabled }: TicketButtonProps) {
  return (
    <button className={`ticket-button-default ${className}`} onClick={onClick} disabled={disabled} >
      {icon}
      <p>{text}</p>
    </button>
  );
}

export default TicketButton;