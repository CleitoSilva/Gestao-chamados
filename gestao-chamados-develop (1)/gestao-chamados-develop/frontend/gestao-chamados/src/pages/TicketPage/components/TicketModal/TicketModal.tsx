import TicketBackdrop from "../TicketBackdrop/TicketBackdrop";
import { Fragment, ReactNode } from "react";

import { IoCloseSharp as CloseIcon } from "react-icons/io5";

import './TicketModal.styles.css';

interface TicketModalProps {
  idModal: string;
  level: number;
  children: ReactNode;
  showModal: boolean;
  closeModal: () => void;
}

function TicketModal({ idModal, level, children, showModal, closeModal }: TicketModalProps) {
  return (
    <Fragment>
      {showModal &&
        <main className="ticket-modal-container">
          <TicketBackdrop idModal={idModal} level={level} closeModal={closeModal} />
          <section id={idModal} className="ticket-modal-content" style={{ zIndex: level * 1000 + 1 }}>
            {children}
            <button className="close-modal" onClick={closeModal}>
              <CloseIcon />
            </button>
          </section>
        </main>
      }
    </Fragment>
  );
}

export default TicketModal;