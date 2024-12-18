import { Fragment } from "react/jsx-runtime";
import { TicketStatus } from "../../utils/enums/TicketStatusEnum";
import TicketButton from "../TicketButton/TicketButton";

import { ReactComponent as PlayIcon } from "../../../../assets/icons/fluent_play-24-filled.svg";
import { ReactComponent as PauseIcon } from "../../../../assets/icons/flowbite_pause-solid.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/mdi_cancel.svg";
import { ReactComponent as FinishIcon } from "../../../../assets/icons/mingcute_send-fill.svg";

import { ReactComponent as StatusIcon } from "../../../../assets/icons/material-symbols_change-circle-outline.svg";

import './TicketStatusButtons.styles.css';
import TicketModal from "../TicketModal/TicketModal";
import React, { ReactElement, useContext, useState } from "react";
import TicketChangeStatus from "../TicketChangeStatus/TicketChangeStatus";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { PauseTicket } from "../../../../service/Ticket/PauseTicket";
import { ReinitializeTicket } from "../../../../service/Ticket/ReinitializeTicket";
import { CancelTicket } from "../../../../service/Ticket/CancelTicket";
import { FinishTicket } from "../../../../service/Ticket/FinishTicket";
import { TicketContext } from "../../contexts/TicketContext";

interface TicketStatusButtonsProps {
  idTicket: number;
  ticketStatus: number;
}

function TicketStatusButtons({ idTicket, ticketStatus }: TicketStatusButtonsProps) {
  const { notify } = useContext(NotificationContext);
  const { refreshStatus, refreshEvents } = useContext(TicketContext);

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [textStatus, setTextStatus] = useState<string>("");
  const [iconStatus, setIconStatus] = useState<ReactElement>(<Fragment />);
  const [labelStatus, setLabelStatus] = useState<ReactElement>(<Fragment />);
  const [typeStatus, setTypeStatus] = useState<number>(0);

  const handlePauseTicket = async () => {
    try {
      const resPause = await PauseTicket(idTicket);

      if (resPause && resPause.data && resPause.data.message) {
        notify.success(resPause.data.message);
        refreshStatus();
        refreshEvents();
      }

      setShowStatusModal(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao pausar o chamado!");
    }
  }

  const handleReinitializeTicket = async () => {
    try {
      const resReinitialize = await ReinitializeTicket(idTicket);

      if (resReinitialize && resReinitialize.data && resReinitialize.data.message) {
        notify.success(resReinitialize.data.message);
        refreshStatus();
        refreshEvents();
      }
      
      setShowStatusModal(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao reiniciar o chamado!");
    }
  }

  const handleCancelTicket = async () => {
    try {
      const resCancel = await CancelTicket(idTicket);

      if (resCancel && resCancel.data && resCancel.data.message) {
        notify.success(resCancel.data.message);
        refreshStatus();
        refreshEvents();
      }

      setShowStatusModal(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao cancelar o chamado!");
    }
  }

  const handleFinishTicket = async () => {
    try {
      const resFinish = await FinishTicket(idTicket);

      if (resFinish && resFinish.data && resFinish.data.message) {
        notify.success(resFinish.data.message);
        refreshStatus();
        refreshEvents();
      }

      setShowStatusModal(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao finalizar o chamado!");
    }
  }

  const handleFunction = async () => {
    switch(typeStatus) {
      case TicketStatus.PAUSED:
        await handlePauseTicket();
        break;
      case TicketStatus.RUNNING:
        await handleReinitializeTicket();
        break;
      case TicketStatus.CANCELED:
        await handleCancelTicket();
        break;
      case TicketStatus.FINISH:
        await handleFinishTicket();
        break;
      default:
    }
  }

  return (
    <Fragment>
      {ticketStatus === TicketStatus.RUNNING ?
        <Fragment>
          <TicketButton className="status-button" 
            icon={<PauseIcon className="button-default-icon" />} 
            text="Pausar" 
            onClick={() => {
              setTextStatus("Pausar Chamado");
              setIconStatus(<PauseIcon className="button-close-icon" />);
              setLabelStatus(
                <p>
                  Insira o número de seu crachá e posteriormente pressione 
                  em <strong>Confirmar</strong> para pausar o chamado
                </p>
              )
              setTypeStatus(TicketStatus.PAUSED);
              setShowStatusModal(true);
            }} 
          />
          <TicketButton className="status-button" 
            icon={<CancelIcon className="button-default-icon" />} 
            text="Cancelar" 
            onClick={() => {
              setTextStatus("Cancelar Chamado");
              setIconStatus(<CancelIcon className="button-close-icon" />);
              setLabelStatus(
                <p>
                  Insira o número de seu crachá e posteriormente pressione 
                  em <strong>Confirmar</strong> para cancelar o chamado
                </p>
              )
              setTypeStatus(TicketStatus.CANCELED);
              setShowStatusModal(true);
            }} 
          />
          <TicketButton className="status-button" 
            icon={<FinishIcon className="button-default-icon" />} 
            text="Finalizar" 
            onClick={() => {
              setTextStatus("Finalizar Chamado");
              setIconStatus(<FinishIcon className="button-close-icon" />);
              setLabelStatus(
                <p>
                  Insira o número de seu crachá e posteriormente pressione 
                  em <strong>Confirmar</strong> para finalizar o chamado
                </p>
              )
              setTypeStatus(TicketStatus.FINISH);
              setShowStatusModal(true);
            }} 
          />
        </Fragment>
        : 
        ticketStatus === TicketStatus.PAUSED ?
          <Fragment>
            <TicketButton className="status-button" 
              icon={<PlayIcon className="button-default-icon" />} 
              text="Reiniciar" 
              onClick={() => {
                setTextStatus("Reiniciar Chamado");
                setIconStatus(<PlayIcon className="button-default-icon" />);
                setLabelStatus(
                  <p>
                    Insira o número de seu crachá e posteriormente pressione 
                    em <strong>Confirmar</strong> para reiniciar o chamado
                  </p>
                )
                setTypeStatus(TicketStatus.RUNNING);
                setShowStatusModal(true);
              }} 
            />
            <TicketButton className="status-button" 
              icon={<CancelIcon className="button-default-icon" />} 
              text="Cancelar" 
              onClick={() => {
                setTextStatus("Cancelar Chamado");
                setIconStatus(<CancelIcon className="button-close-icon" />);
                setLabelStatus(
                  <p>
                    Insira o número de seu crachá e posteriormente pressione 
                    em <strong>Confirmar</strong> para cancelar o chamado
                  </p>
                )
                setTypeStatus(TicketStatus.CANCELED);
                setShowStatusModal(true);
              }} 
            />
          </Fragment>
        :
          <div className="no-change-ticket-status">
            <StatusIcon />
            <p>Não é possível alterar o status</p>
          </div>
      }
      <TicketModal
        level={2}
        idModal="ticket-change-status-modal"
        showModal={showStatusModal}
        closeModal={() => setShowStatusModal(false)}
      >
        <TicketChangeStatus 
          text={textStatus}
          label={labelStatus}
          icon={iconStatus}
          onSubmit={handleFunction}
          closeModal={() => setShowStatusModal(false)}
        />
      </TicketModal>
    </Fragment>
  );
}

export default TicketStatusButtons;