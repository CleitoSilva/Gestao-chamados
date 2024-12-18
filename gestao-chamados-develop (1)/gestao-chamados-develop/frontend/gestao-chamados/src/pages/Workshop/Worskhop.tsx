import { useEffect, useState } from "react";
import { AnimatedContainer } from "../../components";
import SelectFilter2 from "../../components/Filters/SelectFilter2";
import { Table as WorkshopTable } from "./Table/WorkshopTable";
import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { CategoriaTecnincaService, TicketsService } from "../../service";
import './Workshop.styles.css'
import { IChamado } from "../../interfaces/IChamado";
import { UseConfigHook } from "./Hook/useConfigHook";
import Pagination from "../../components/Pagination/Pagination";
import { IChamadoFilter } from "./IChamadoFilter";
import TextFilter from "../../components/Filters/TextFilter";

export const Workshop = () => {
    const [idCategoria, setIdCategoria] = useState(() => localStorage.getItem("categoria_oficina") || "");
    const [categoria, setCategoria] = useState<ICategoriaTecnica>();
    const [chamadoFilter, setChamadoFilter] = useState<IChamadoFilter>({ area: "", subarea: "", line: "", machine: "", createdDate: "" });

    const {
        tableData,
        setTableData,
        renderPaginate,
        currentPage,
        amountOfPages,
        setAmountOfPages,
        onPaginate
    } = UseConfigHook();

    const fetchCategoria = async (id: string) => {
        if (id) {
            const fetchedCategoria = await CategoriaTecnincaService.GetColaboradorCategoriaTecnicaById(id);
            setCategoria(fetchedCategoria);
        }
    };

    const handleCategoriaChange = (id: string) => {
        if (id.length > 0) {
            setIdCategoria(id);
        }
    };

    useEffect(() => {
        localStorage.setItem("categoria_oficina", idCategoria);
        if (localStorage.getItem("categoria_oficina") !== null) {
            const id = localStorage.getItem("categoria_oficina");
            if (id) {
                fetchCategoria(id);
                setIdCategoria(id);
            }
        }

    }, [idCategoria]);

    useEffect(() => {
        onPaginate(0);
        resgatarTickets(); //Tá truncando
    }, [chamadoFilter]);

    useEffect(() => {
        resgatarTickets(); //Tá truncando
    }, [idCategoria, currentPage]);

    useEffect(() => {
        const storedIdCategoria = localStorage.getItem("categoria_oficina");
        if (storedIdCategoria) {
            setIdCategoria(storedIdCategoria);
            fetchCategoria(storedIdCategoria);
        }
    }, []);

    const resgatarTickets = async () => {
        const params = new URLSearchParams();
        params.append('idTechniqueCategory', idCategoria);
        if (chamadoFilter.area) { params.append('area', chamadoFilter.area); }
        if (chamadoFilter.subarea) { params.append('subarea', chamadoFilter.subarea); }
        if (chamadoFilter.line) { params.append('line', chamadoFilter.line); }
        if (chamadoFilter.machine) { params.append('machine', chamadoFilter.machine); }
        if (chamadoFilter.createdDate) { params.append('createdDate', chamadoFilter.createdDate); }
        if (chamadoFilter) { params.append('page', (currentPage + 1).toString()); }
        const res = await TicketsService.GetPaginateTicketWorkshop(params.toString()) as { pagesCount: number, items: IChamado[] };
        setAmountOfPages(res.pagesCount);
        setTableData(res.items as IChamado[]);
    }

    return (
        <div className='config-page'>
            <div className='config-header-workshop'>
                <div className="title-especialidade">
                    <h3 className="title-simple">Oficina <span className="underlined">{categoria?.name}</span></h3>
                </div>
                <div>
                    <SelectFilter2
                        column="Oficina"
                        number={4}
                        value={idCategoria} // Ensure SelectFilter2 reflects the current idCategoria
                        onFilterChange={(e) => handleCategoriaChange(e)}
                    />
                </div>
            </div>
            <div className='page-title'>
                <div className="filter-inputs" key={0}>
                    <>
                        <TextFilter type="datetime-local" column="Data" onFilterChange={(value) => setChamadoFilter({ ...chamadoFilter, createdDate: value })}/>
                        <SelectFilter2 isFilter={1} column={"Área"} number={0} onFilterChange={(value) => setChamadoFilter({ ...chamadoFilter, area: value })} />
                        <SelectFilter2 isFilter={1} column={"Subárea"} number={1} onFilterChange={(value) => setChamadoFilter({ ...chamadoFilter, subarea: value })} />
                        <SelectFilter2 isFilter={1} column={"Linha"} number={2} onFilterChange={(value) => setChamadoFilter({ ...chamadoFilter, line: value })} />
                        <SelectFilter2 isFilter={1} column={"Máquina"} number={3} onFilterChange={(value) => setChamadoFilter({ ...chamadoFilter, machine: value })} />
                    </>
                </div>
            </div>
            <AnimatedContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={0}
                className='page-content'>
                <WorkshopTable data={tableData as IChamado[]} idCategoria={Number(idCategoria)}/>
            </AnimatedContainer>

            {renderPaginate && (
                <Pagination
                    currentPage={currentPage}
                    onChange={(page) => {
                        onPaginate(page);
                    }}
                    totalAmountOfPages={amountOfPages - 1}
                />)}
        </div>
    );
};
