import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../contexts/NotificationContext";
import TicketHeader from "./components/TicketHeader/TicketHeader";
import TicketInformation from "./components/TicketInformation/TicketInformation";
import TicketEvents from "./components/TicketEvents/TicketEvents";

import TicketActionsButton from "./components/TicketActionsButton/TicketActionsButton";
import TicketModal from "./components/TicketModal/TicketModal";
import TicketMainActions from "./components/TicketMainActions/TicketMainActions";

import { ReactComponent as ActionsIcon } from '../../assets/icons/material-symbols_note-stack-outline.svg';

import './TicketPage.styles.css'
import { TicketContext } from "./contexts/TicketContext";
import TicketAside from "./components/TicketAside/TicketAside";

function TicketPage() {
  const { idTicket } = useParams();
  const { notify } = useContext(NotificationContext);
  const { ticket, status, events, getTicket } = useContext(TicketContext);

  const [forceNotOverload, setForceNotOverload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // const [ticket, setTicket] = useState<ITicket>();

  useEffect(() => setForceNotOverload(true), []);

  const fetchTicket = async () => {
    try {
      if (!idTicket) return;

      setLoading(true);

      let idTicketParsed = parseInt(idTicket);

      // const resTicket = await GetTicketById(idTicketParsed);

      // if (resTicket && resTicket.data) 
      //   setTicket(resTicket.data.payload);

      await getTicket(idTicketParsed);

      setLoading(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao obter o chamado!");
    }
  }

  useEffect(() => {
    if (forceNotOverload) {
      fetchTicket();

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [idTicket, forceNotOverload]);

  return (
    <main className="ticket-page-container">
      {loading ? 
        <span>Loading...</span>
        : 
        <Fragment>
          {ticket ? 
            <section className="ticket-page-content">
              <span className="ticket-main-info">
                <TicketHeader idTicket={ticket.id} statusTicket={status} />
                <TicketInformation ticket={ticket} />
                <TicketEvents events={events} />
              </span>
              {windowWidth <= 1050 ?
                <Fragment>
                  <TicketActionsButton 
                    className="fixed" 
                    text="Ações do Chamado" 
                    icon={<ActionsIcon />}
                    onClick={() => setShowModal(true)} 
                  />
                  <TicketModal
                    idModal="ticket-modal"
                    level={1}
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                  >
                    <TicketMainActions
                      closeModal={() => setShowModal(false)}
                    />
                  </TicketModal>
                </Fragment>
                :
                <Fragment>
                  <aside className="actions-for-desktop">
                    <TicketAside />
                  </aside>
                </Fragment>
              }
            </section>
            :
            <span>Chamado não encontrado</span> 
          }
        </Fragment>
      }
    </main>
  );
}

export default TicketPage;