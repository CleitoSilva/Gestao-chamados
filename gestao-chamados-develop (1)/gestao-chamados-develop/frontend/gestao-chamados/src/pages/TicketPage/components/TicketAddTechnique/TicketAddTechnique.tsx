import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";

import { ReactComponent as TechniqueIcon } from "../../../../assets/icons/ph_gear-six.svg";

import { HiOutlineSearch as SearchIcon } from "react-icons/hi";

import { useContext, useEffect, useState } from "react";
import { ICategoriaTecnica } from "../../../../interfaces/ICategoriaTecnica";
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";

import './TicketAddTechnique.styles.css';
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { GetAllTechsNotInTickets } from "../../../../service/CategoriaTecnica/GetAllTechsNotInTickets";
import { AddTechniqueTicket } from "../../../../service/Ticket/AddTechniqueTicket";
import { TicketContext } from "../../contexts/TicketContext";

interface TicketAddTechniqueProps {
  idTicket: number;
  closeModal: () => void;
}

function TicketAddTechnique({ idTicket, closeModal }: TicketAddTechniqueProps) {
  const { notify } = useContext(NotificationContext);
  const { refreshTechniques, refreshEvents } = useContext(TicketContext);

  const [forceNotOverload, setForceNotOverload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTech, setSearchTech] = useState<string>("");
  const [selectedTechnique, setSelectedTechnique] = useState<ICategoriaTecnica>();
  const [techniques, setTechniques] = useState<ICategoriaTecnica[]>();
  const [filteredTechniques, setFilteredTechniques] = useState<ICategoriaTecnica[]>();

  useEffect(() => {
    setForceNotOverload(true);
  }, []);

  const fetchTechniques = async () => {
    try {
      if (!idTicket) return;

      setLoading(true);

      const resTicket = await GetAllTechsNotInTickets(idTicket);

      if (resTicket && resTicket.data) {
        setTechniques(resTicket.data.payload);
        setFilteredTechniques(resTicket.data.payload);
      }

      setLoading(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao obter as categorias técnicas!");
    }
  }

  useEffect(() => {
    if (forceNotOverload) 
      fetchTechniques();
  }, [forceNotOverload]);

  useEffect(() => {
    setFilteredTechniques(techniques?.filter(e => e.name.toLowerCase().includes(searchTech.toLowerCase())))
  }, [searchTech]);

  const handleAddTechnique = async () => {
    try {
      if (!selectedTechnique) {
        notify.error("Nenhuma especialidade adicionada");
        return;
      }

      const resTech = await AddTechniqueTicket(idTicket, selectedTechnique.id);

      if (resTech && resTech.data && resTech.data.message) {
        notify.success(resTech.data.message);
        refreshTechniques();
        refreshEvents();
      }

      closeModal();
    } catch(error) {
      notify.error("Erro ao adicionar especialidade ao chamado!")
    }
  }

  return (
    <section className="ticket-add-technique-container">
      <TicketActionsButton 
        icon={<TechniqueIcon className="tech-icon-add" />}
        text="Adicionar Especialidade"
        className="adding"
        onClick={closeModal}
      />
      <article className="ticket-add-technique-content">
        <div className="ticket-add-technique-select-area">
          <div className="ticket-add-search">
            <button className="">
              <SearchIcon />
            </button>
            <input 
              type="text" 
              placeholder="Pesquisar..."
              value={searchTech}
              onChange={(e) => setSearchTech(e.target.value)}
            />
          </div>
          <ul className="ticket-add-techniques-list">
            {filteredTechniques?.map(t => 
              <li key={t.id} 
                onClick={() => setSelectedTechnique(t)} 
                className={t.id === selectedTechnique?.id ? "selected" : ""}
              >
                <h4>{t.name}</h4>
              </li>
            )}
          </ul>
        </div>
        {selectedTechnique &&
          <TicketConfirmAction 
            label={
              <p>
                Insira o número de seu crachá e posteriormente pressione 
                em <strong>Confirmar</strong> para acionar a 
                especialidade: <strong>{selectedTechnique.name}</strong>
              </p>
            }
            placeholder="Insira o número de seu crachá..."
            onSubmit={() => handleAddTechnique()}
            onCancel={closeModal}
          />
        }
      </article>
    </section>
  );
}

export default TicketAddTechnique;