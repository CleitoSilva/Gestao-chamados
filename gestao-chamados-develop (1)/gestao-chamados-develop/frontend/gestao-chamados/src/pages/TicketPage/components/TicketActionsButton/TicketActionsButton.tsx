import { ReactElement } from 'react';
import { ReactComponent as ActionsIcon } from '../../../../assets/icons/material-symbols_note-stack-outline.svg';

import './TicketActionsButton.styles.css';

interface TicketActionsButtonProps {
  className?: string;
  text: string;
  icon: ReactElement;
  onClick: () => void;
}

function TicketActionsButton({ className, text, icon, onClick }: TicketActionsButtonProps) {
  return (
    <button className={`ticket-actions-button ${className}`} onClick={onClick}>
      <p>{text}</p>
      {icon}
    </button>
  );
}

export default TicketActionsButton;