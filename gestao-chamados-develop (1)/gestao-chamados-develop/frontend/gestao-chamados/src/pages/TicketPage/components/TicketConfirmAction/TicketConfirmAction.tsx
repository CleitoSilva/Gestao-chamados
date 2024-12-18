import { Fragment, ReactElement, useContext, useState } from 'react';
import './TicketConfirmAction.styles.css';
import { IColaborador } from '../../../../interfaces/IColaborador';

import { FaUserLarge as UserIcon } from "react-icons/fa6";
import { NotificationContext } from '../../../../contexts/NotificationContext';
import { GetColaboratorByIdentification } from '../../../../service/Colaborador/GetColaboratorByIdentification';

import { IoCloseSharp as CloseIcon } from "react-icons/io5";
import { TicketContext } from '../../contexts/TicketContext';

interface TicketConfirmActionProps {
  label: ReactElement;
  placeholder: string;
  onSubmit: (colaborator: IColaborador) => void;
  onCancel: () => void;
}

function TicketConfirmAction({ label, placeholder, onSubmit, onCancel }: TicketConfirmActionProps) {
  const { notify } = useContext(NotificationContext);
  const { workingColaborator, setWorkingColaborator } = useContext(TicketContext);

  const [card, setCard] = useState<string>("");

  const handleIdentifyColaborator = async () => {
    try {
      const resColaborator = await GetColaboratorByIdentification({
        Badge: card
      });

      if (resColaborator && resColaborator.data && resColaborator.data.payload) 
        setWorkingColaborator(resColaborator.data.payload);
      else
        notify.error("Não achamos nenhum colaborador com essa identificação");
    } catch(error) {
      notify.error("Ocorreu um erro ao obter o colaborador");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workingColaborator) 
      onSubmit(workingColaborator);
    else
      notify.error("Por favor, identifique-se");
  }

  return (
    <form className="ticket-confirm-action" onSubmit={(e) => handleSubmit(e)}>
      {label}
      {workingColaborator ?
        <Fragment>
          <p>Para voltar clique em &times;</p>
          <div className='colaborator-indicator'>
            <div className='colaborator-info'>
              <i>
                <UserIcon />
              </i>
              <span>
                <h3>{workingColaborator.name}</h3>
                <h5>RE: {workingColaborator.reNumber}{workingColaborator.techniqueCategory ? ` - ${workingColaborator.techniqueCategory.name}` : ""}</h5>
              </span>
            </div>
            <button className='change-identify' type='button' onClick={() => setWorkingColaborator(undefined)}>
              <CloseIcon />
            </button>
          </div>
          <button type="submit">
            Confirmar
          </button>
        </Fragment>
        :
        <Fragment>
          <input type="text" placeholder={placeholder} onChange={(e) => setCard(e.target.value)} />
          <button type='button' className='identify' onClick={handleIdentifyColaborator}>
            Identificar-se
          </button>
        </Fragment>
      }
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}

export default TicketConfirmAction;