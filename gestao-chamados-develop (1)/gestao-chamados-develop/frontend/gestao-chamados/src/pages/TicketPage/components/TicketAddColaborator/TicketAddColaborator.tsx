import { useContext, useEffect, useState } from "react";
import TicketConfirmAction from "../TicketConfirmAction/TicketConfirmAction";
import { IColaborador } from "../../../../interfaces/IColaborador";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import TicketActionsButton from "../TicketActionsButton/TicketActionsButton";

import { ReactComponent as ColaboratorIcon } from "../../../../assets/icons/healthicons_construction-worker.svg";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { GetAllColaboratorsNotInTickets } from "../../../../service/Colaborador/GetAllColaboratorsNotInTickets";

import './TicketAddColaborator.styles.css';
import { AddColaboratorTicket } from "../../../../service/Ticket/AddColaboratorTicket";
import { TicketContext } from "../../contexts/TicketContext";

interface TicketAddColaboratorsProps {
  idTicket: number;
  closeModal: () => void;
}

function TicketAddColaborator({ idTicket, closeModal }: TicketAddColaboratorsProps) {
  const { notify } = useContext(NotificationContext);
  const { refreshColaborators, refreshEvents, refreshTechniques } = useContext(TicketContext);

  const [forceNotOverload, setForceNotOverload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTech, setSearchTech] = useState<string>("");
  const [selectedColaborator, setSelectedColaborator] = useState<IColaborador>();
  const [colaborators, setColaborators] = useState<IColaborador[]>();
  const [filteredColaborators, setFilteredColaborators] = useState<IColaborador[]>();

  useEffect(() => {
    setForceNotOverload(true);
  }, []);

  const fetchColaborators = async () => {
    try {
      if (!idTicket) return;

      setLoading(true);

      const resTicket = await GetAllColaboratorsNotInTickets(idTicket);

      if (resTicket && resTicket.data) {
        setColaborators(resTicket.data.payload);
        setFilteredColaborators(resTicket.data.payload);
      }

      setLoading(false);
    } catch (error) {
      notify.error("Ocorreu um erro ao obter os colaboradores!");
    }
  }

  useEffect(() => {
    if (forceNotOverload) 
      fetchColaborators();
  }, [forceNotOverload]);

  useEffect(() => {
    setFilteredColaborators(colaborators?.filter(e => e.name.toLowerCase().includes(searchTech.toLowerCase())))
  }, [searchTech]);

  const handleAddColaborator = async () => {
    try {
      if (!selectedColaborator) {
        notify.error("Nenhum coloborador selecionado");
        return;
      }

      const resTech = await AddColaboratorTicket(idTicket, selectedColaborator.id);

      if (resTech && resTech.data && resTech.data.message) {
        notify.success(resTech.data.message);
        refreshColaborators();
        refreshEvents();
        refreshTechniques();
      }

      closeModal();
    } catch(error) {
      notify.error("Erro ao adicionar colaborador ao chamado!")
    }
  }

  return (
    <section className="ticket-add-colaborator-container">
      <TicketActionsButton 
        icon={<ColaboratorIcon className="tech-icon-add" />}
        text="Entrar no Chamado"
        className="adding"
        onClick={closeModal}
      />
      <article className="ticket-add-colaborator-content">
        <div className="ticket-add-colaborator-select-area">
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
          <ul className="ticket-add-colaborators-list">
            {filteredColaborators?.map(c => 
              <li key={c.id} 
                onClick={() => setSelectedColaborator(c)} 
                className={c.id === selectedColaborator?.id ? "selected" : ""}
              >
                <span>
                  <h4>{c.name ?? "---"}</h4>
                  <p>{c.techniqueCategory?.name ?? "---"}</p>
                </span>
              </li>
            )}
          </ul>
        </div>
        {selectedColaborator &&
          <TicketConfirmAction 
            label={
              <p>
                Insira o número de seu crachá e posteriormente pressione 
                em <strong>Confirmar</strong> para a entrada do
                colaborator <strong>{selectedColaborator.name}</strong> no 
                chamado
              </p>
            }
            placeholder="Insira o número de seu crachá..."
            onSubmit={() => handleAddColaborator()}
            onCancel={closeModal}
          />
        }
      </article>
    </section>
  );
}

export default TicketAddColaborator;