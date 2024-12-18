import './TicketBackdrop.styles.css';

interface TicketBackdropProps {
  idModal: string;
  level: number;
  closeModal: () => void;
}

function TicketBackdrop({ idModal, level, closeModal }: TicketBackdropProps) {
  const handleClickBackdrop = (e: React.MouseEvent) => {
		const modal = document.getElementById(idModal);

		if (modal && !modal.contains(e.target as Node)) {
			closeModal();
		}
	};

  return (
    <article className="ticket-backdrop" style={{ zIndex: level * 1000 }} onMouseDown={handleClickBackdrop} />
  );
}

export default TicketBackdrop;