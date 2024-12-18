import { AnimatedContainer, Button, FormModal, TabSelector } from "../../components";
import "./Config.styles.css";
import { UseConfigHook } from "./hooks/useConfigHook";
// import { Table as EmpresaTable } from "./Components/Empresa/Table";
import { Table as AreaTable } from "./Components/Area/Table";
// import { Table as CategoriaTable } from "./Components/CategoriaColaborador/Table";
import { Table as CategoriaTecnicaTable } from "./Components/CategoriaTecnica/Table";
import { Table as ColaboradorTable } from "./Components/Colaborador/Table";
import { Table as ComponenteTable } from "./Components/Componente/Table";
// import { Table as EventosTable } from "./Components/Eventos/Table";
import { Table as LinhaTable } from "./Components/Linha/Table";
import { Table as MaquinaTable } from "./Components/Maquina/Table";
import { Table as SubAreaTable } from "./Components/SubArea/Table";
import { Table as TurnoTable } from "./Components/Turno/Table";
import { Table as UsuarioTable } from "./Components/Usuário/Table";
// import { IEmpresa } from "../../interfaces/IEmpresa";
import { FaPlus } from "react-icons/fa";
import { IArea } from "../../interfaces/IArea";
// import { ICategoriaColaborador } from "../../interfaces/ICategoriaColaborador";
import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { IColaborador } from "../../interfaces/IColaborador";
import { IComponente } from "../../interfaces/IComponente";
// import { IEventos } from "../../interfaces/IEventos";
import { ILinha } from "../../interfaces/ILinha";
import { IMaquina } from "../../interfaces/IMaquina";
import { ISubArea } from "../../interfaces/ISubArea";
import { ITurno } from "../../interfaces/ITurno";
import { IUsuario } from "../../interfaces/IUsuario";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { useEffect, useState } from "react";
// import { Form as FormEmpresa } from "./Components/Empresa/Form"
import { Form as FormArea } from "./Components/Area/Form"
import { Form as FormSubArea } from "./Components/SubArea/Form"
// import { Form as FormCategoriaColaborador } from "./Components/CategoriaColaborador/Form"
import { Form as FormCategoriaTecnica } from "./Components/CategoriaTecnica/Form"
import { Form as FormComponente } from "./Components/Componente/Form"
import { Form as FormLinha } from "./Components/Linha/Form"
import { Form as FormMaquina } from "./Components/Maquina/Form"
import { Form as FormTurno } from "./Components/Turno/Form"
import { Form as FormColaborador } from "./Components/Colaborador/Form"
// import { Form as FormEventos } from "./Components/Eventos/Form"
import Pagination from "../../components/Pagination/Pagination";
import { axiosTokenInstance } from "../../apis/axios.config";
import SelectFilter2 from "../../components/Filters/SelectFilter2";
import TextFilter from "../../components/Filters/TextFilter";
import { PGNTD_AREA_URL } from "../../apis/endpoint.config";
import { IAreaFilter } from "./Components/Area/IAreaFilter";
import { ISubAreaFilter } from "./Components/SubArea/ISubAreaFilter";
import { CategoriaTecnincaService, ColaboradorService, ComponenteService, LinhaService, MaquinaService, SubAreaService, TurnoService, UsuarioService } from "../../service";
import { ILineFilter } from "./Components/Linha/ILineFilter";
import { IMaquinaFilter } from "./Components/Maquina/IMaquinaFilter";
import { IComponenteFilter } from "./Components/Componente/IComponenteFilter";
import { ICategoriaTecnicaFilter } from "./Components/CategoriaTecnica/ICategoriaTecninca";
import { ITurnoFilter } from "./Components/Turno/ITurnoFilter";
import { IColaboradorFilter } from "./Components/Colaborador/IColaboradorFilter";
import { IUsuarioFilter } from "./Components/Usuário/IUsuarioFilter";

export const Config = () => {

	const {
		formData,
		tabsArray,
		setSelectedTab,
		selectedTab,
		tableData,
		setTableData,
		setShowFormModal,
		showFormModal,
		errors,
		onSubmitFormData,
		onChangeFormData,
		renderPaginate,
		updateForm,
		currentPage,
		amountOfPages,
		onClickDelete,
		onClickEdit,
		setAmountOfPages,
		onPaginate
	} = UseConfigHook();

	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [idToDelete, setIdToDelete] = useState("");

	//Filtros
	//Filtros - Estados
	const [areaFilter, setAreaFilter] = useState<IAreaFilter>({ name: "", description: "", idEnterpise: "" });
	const [subAreaFilter, setSubAreaFilter] = useState<ISubAreaFilter>({ name: "", description: "", idArea: "" });
	const [lineFilter, setLineFilter] = useState<ILineFilter>({ name: "", number: null, description: "", idArea: "", idSubArea: "" });
	const [machineFilter, setMachineFilter] = useState<IMaquinaFilter>({ name: "", description: "", order: null, idLine: "" });
	const [componentFilter, setComponentFilter] = useState<IComponenteFilter>({ name: "", description: "", idMachine: "" });
	const [categoriaFilter, setCategoriaFilter] = useState<ICategoriaTecnicaFilter>({ name: "", description: "", idArea: "" });
	const [turnoFilter, setTurnoFilter] = useState<ITurnoFilter>({ startHour: "", description: "", endHour: "" });
	const [colaboradorFilter, setColaboradorFilter] = useState<IColaboradorFilter>({ name: "", idTechniqueCategory: "", idShift: "", idLine: "", RFID: "", Cracha: "", RE: "" });
	const [usuarioFilter, setUsuarioFilter] = useState<IUsuarioFilter>({ name: "", userName: "", email: "" });

	//Num Padrão de Pgns
	const numPgs = 10;
	//Pg atual
	const [offset, setOffset] = useState(0);

	//Valores para resetar os filtros
	const initialAreaFilter = { name: "", description: "", idEnterpise: "" };
	const initialSubAreaFilter = { name: "", description: "", idArea: "" };
	const initialLineFilter = { name: "", number: null, description: "", idArea: "", idSubArea: "" };
	const initialMachineFilter = { name: "", description: "", order: null, idLine: "" };
	const initialComponentFilter = { name: "", description: "", idMachine: "" };
	const initialCategoriaFilter = { name: "", description: "", idArea: "" };
	const initialTurnoFilter = { startHour: "", description: "", endHour: "" };
	const initialColaboradorFilter = { name: "", idTechniqueCategory: "", idShift: "", idLine: "", RFID: "", Cracha: "", RE: "" };
	const initialUsuarioFilter = { name: "", userName: "", email: "" };

	const [filterKey, setFilterKey] = useState(0);

	const resetFilters = () => {
		setAreaFilter(initialAreaFilter);
		setSubAreaFilter(initialSubAreaFilter);
		setLineFilter(initialLineFilter);
		setMachineFilter(initialMachineFilter);
		setComponentFilter(initialComponentFilter);
		setCategoriaFilter(initialCategoriaFilter);
		setTurnoFilter(initialTurnoFilter);
		setColaboradorFilter(initialColaboradorFilter);
		setUsuarioFilter(initialUsuarioFilter);
	};

	//useEffect usada para resatar os filtros quando se muda de aba e resetar paginação
	useEffect(() => {
		resetFilters();
		setOffset(0);
		onPaginate(0);
		//Limpando por boa prática o conteúdo quando trocamos de aba
		setTableData(undefined);
		setAmountOfPages(0);
	}, [selectedTab]);

	//useEffect usada para resatar os filtros quando se muda de filtro
	useEffect(() => {
		//Limpando o conteúdo
		setTableData(undefined);
		setAmountOfPages(0);
		setOffset(0);
		onPaginate(0);
	}, [areaFilter, subAreaFilter, lineFilter, machineFilter, categoriaFilter, componentFilter, turnoFilter, colaboradorFilter, usuarioFilter]);


	//Funções para resgatar as páginas
	const resgatarArea = async () => {
		const params = new URLSearchParams();
		if (areaFilter.name) { params.append('name', areaFilter.name); }
		if (areaFilter.description) { params.append('description', areaFilter.description); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await axiosTokenInstance.get(`${PGNTD_AREA_URL}?${params.toString()}`);
		setAmountOfPages(res.data.payload.pagesCount);
		setTableData(res.data.payload.items as IArea[]);
	}

	const resgatarSubArea = async () => {
		const params = new URLSearchParams();
		if (subAreaFilter.name) { params.append('name', subAreaFilter.name); }
		if (subAreaFilter.description) { params.append('description', subAreaFilter.description); }
		if (subAreaFilter.idArea) { params.append('area', subAreaFilter.idArea); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await SubAreaService.GetPaginateSubArea(params.toString()) as { pagesCount: number, items: ISubArea[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as ISubArea[]);
	}

	const resgatarLinha = async () => {
		const params = new URLSearchParams();
		if (lineFilter.name) { params.append('name', lineFilter.name); }
		if (lineFilter.number) { params.append('number', lineFilter.number.toString()); }
		if (lineFilter.description) { params.append('description', lineFilter.description); }
		if (lineFilter.idArea) { params.append('area', lineFilter.idArea); }
		if (lineFilter.idSubArea) { params.append('subarea', lineFilter.idSubArea); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await LinhaService.GetPaginateLinhas(params.toString()) as { pagesCount: number, items: ILinha[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as ILinha[]);
	}

	const resgatarMaquina = async () => {
		const params = new URLSearchParams();
		if (machineFilter.name) { params.append('name', machineFilter.name); }
		if (machineFilter.description) { params.append('description', machineFilter.description); }
		if (machineFilter.order) { params.append('order', machineFilter.order.toString()); }
		if (machineFilter.idLine) { params.append('line', machineFilter.idLine); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await MaquinaService.GetPaginateMachines(params.toString()) as { pagesCount: number, items: IMaquina[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as IMaquina[]);
	}

	const resgatarComponente = async () => {
		const params = new URLSearchParams();
		if (componentFilter.name) { params.append('name', componentFilter.name); }
		if (componentFilter.description) { params.append('description', componentFilter.description); }
		if (componentFilter.idMachine) { params.append('machine', componentFilter.idMachine); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await ComponenteService.GetPaginateComponets(params.toString()) as { pagesCount: number, items: IComponente[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as IComponente[]);
	}

	const resgatarCategoria = async () => {
		const params = new URLSearchParams();
		if (categoriaFilter.name) { params.append('name', categoriaFilter.name); }
		if (categoriaFilter.description) { params.append('description', categoriaFilter.description); }
		if (categoriaFilter.idArea) { params.append('location', categoriaFilter.idArea); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await CategoriaTecnincaService.GetPaginateCategoriaTecnica(params.toString()) as { pagesCount: number, items: ICategoriaTecnica[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as ICategoriaTecnica[]);
	}

	const resgatarTurno = async () => {
		const params = new URLSearchParams();
		if (turnoFilter.description) { params.append('description', turnoFilter.description); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await TurnoService.GetPaginateTurno(params.toString()) as { pagesCount: number, items: ITurno[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as ITurno[]);
	}

	const resgatarUsuario = async () => {
		const params = new URLSearchParams();
		if (usuarioFilter.name) { params.append('name', usuarioFilter.name); }
		if (usuarioFilter.userName) { params.append('username', usuarioFilter.userName); }
		if (usuarioFilter.email) { params.append('email', usuarioFilter.email); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await UsuarioService.GetPaginateUsuario(params.toString()) as { pagesCount: number, items: IUsuario[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as IUsuario[]);
	}

	const resgatarColaborador = async () => {
		const params = new URLSearchParams();
		if (colaboradorFilter.name) { params.append('name', colaboradorFilter.name); }
		if (colaboradorFilter.idTechniqueCategory) { params.append('technique', colaboradorFilter.idTechniqueCategory); }
		if (colaboradorFilter.idShift) { params.append('shift', colaboradorFilter.idShift); }
		if (colaboradorFilter.idLine) { params.append('line', colaboradorFilter.idLine); }
		if (colaboradorFilter.RFID) { params.append('rfid', colaboradorFilter.RFID); }
		if (colaboradorFilter.Cracha) { params.append('badge', colaboradorFilter.Cracha); }
		if (colaboradorFilter.RE) { params.append('re', colaboradorFilter.RE); }
		if (currentPage) { params.append('page', (currentPage + 1).toString()); }
		const res = await ColaboradorService.GetPaginateColaborador(params.toString()) as { pagesCount: number, items: IColaborador[] };
		setAmountOfPages(res.pagesCount);
		setTableData(res.items as IColaborador[]);
	}

	const handleConfirmationModal = (id: string) => {
		setShowConfirmationModal(true);
		setIdToDelete(id);
	};

	const handleConfirm = async () => {
		await onClickDelete(idToDelete);
		if (selectedTab === 0) { resgatarArea(); }
		if (selectedTab === 1) { resgatarSubArea(); }
		if (selectedTab === 2) { resgatarLinha(); }
		if (selectedTab === 3) { resgatarMaquina(); }
		if (selectedTab === 4) { resgatarComponente(); }
		if (selectedTab === 5) { resgatarCategoria(); }
		if (selectedTab === 6) { resgatarColaborador(); }
		if (selectedTab === 7) { resgatarTurno();}
		if (selectedTab === 8) { resgatarUsuario(); }
		setShowConfirmationModal(false);
	};

	const handleConcelModal = () => {
		setShowConfirmationModal(false);
		setIdToDelete("");
	};

	//Filtros
	useEffect(() => {
		const fetchData = async () => {
			try {
				switch (selectedTab) {
					case 0: {
						resgatarArea();
						break;
					}
					case 1: {
						resgatarSubArea();
						break;
					}
					case 2: {
						resgatarLinha();
						break;
					}
					case 3: {
						resgatarMaquina();
						break;
					}
					case 4: {
						resgatarComponente();
						break;
					}
					case 5: {
						resgatarCategoria();
						break;
					}
					case 6: {
						resgatarColaborador();
						break;
					}
					case 7: {
						resgatarTurno();
						break;
					}
					case 8: {
						resgatarUsuario();
						break;
					}
					default:
						break;
				}
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};

		fetchData();
	}, [areaFilter, subAreaFilter, lineFilter, machineFilter, componentFilter, categoriaFilter, turnoFilter, colaboradorFilter, usuarioFilter, currentPage]);


	return (
		<div className='config-page'>
			<div className='config-header'>
				{/* Seletor de Aba */}
				<TabSelector
					onClickTab={(tab) => setSelectedTab(tab)}
					activeTab={selectedTab}
					tabs={tabsArray} />
			</div>
			<div className='page-title'>
				<div className="filter-inputs" key={filterKey}>
					{/* Input - Filtros */}
					{selectedTab === 0 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setAreaFilter({ ...areaFilter, name: value })} />
							<TextFilter column="description" onFilterChange={(value) => setAreaFilter({ ...areaFilter, description: value })} />
						</>
					)}

					{selectedTab === 1 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setSubAreaFilter({ ...subAreaFilter, name: value })} />
							<TextFilter column="description" onFilterChange={(value) => setSubAreaFilter({ ...subAreaFilter, description: value })} />
							<SelectFilter2 isFilter={1} column={"Área"} number={0} onFilterChange={(value) => setSubAreaFilter({ ...subAreaFilter, idArea: value })} />
						</>
					)}

					{selectedTab === 2 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setLineFilter({ ...lineFilter, name: value })} />
							<TextFilter column="number" onFilterChange={(value) => setLineFilter({ ...lineFilter, number: Number(value) })} />
							<TextFilter column="description" onFilterChange={(value) => setLineFilter({ ...lineFilter, description: value })} />
							<SelectFilter2 isFilter={1} column={"Área"} number={0} onFilterChange={(value) => setLineFilter({ ...lineFilter, idArea: value })} />
							<SelectFilter2 isOpcional={1} isFilter={1} column={"Subárea"} number={1} onFilterChange={(value) => setLineFilter({ ...lineFilter, idSubArea: value })} />
						</>
					)}

					{selectedTab === 3 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setMachineFilter({ ...machineFilter, name: value })} />
							<TextFilter column="description" onFilterChange={(value) => setMachineFilter({ ...machineFilter, description: value })} />
							<TextFilter column="order" onFilterChange={(value) => setMachineFilter({ ...machineFilter, order: Number(value) })} />
							<SelectFilter2 isFilter={1} column={"Linha"} number={2} onFilterChange={(value) => setMachineFilter({ ...machineFilter, idLine: value })} />
						</>
					)}

					{selectedTab === 4 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setComponentFilter({ ...componentFilter, name: value })} />
							<TextFilter column="description" onFilterChange={(value) => setComponentFilter({ ...componentFilter, description: value })} />
							<SelectFilter2 isFilter={1} column={"Máquina"} number={3} onFilterChange={(value) => setComponentFilter({ ...componentFilter, idMachine: value })} />
						</>
					)}

					{selectedTab === 5 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setCategoriaFilter({ ...categoriaFilter, name: value })} />
							<TextFilter column="description" onFilterChange={(value) => setCategoriaFilter({ ...categoriaFilter, description: value })} />
							<SelectFilter2 isFilter={1} column={"Área"} number={0} onFilterChange={(value) => setCategoriaFilter({ ...categoriaFilter, idArea: value })} />
						</>
					)}

					{selectedTab === 6 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, name: value })} />
							<SelectFilter2 isFilter={1} column={"Categoria Técnica"} number={4} onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, idTechniqueCategory: value })} />
							<SelectFilter2 isFilter={1} column={"Turno"} number={5} onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, idShift: value })} />
							<SelectFilter2 isFilter={1} column={"Linha"} number={2} onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, idLine: value })} />
							<TextFilter column="RFID" onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, RFID: value })} />
							<TextFilter column="Crachá" onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, Cracha: value })} />
							<TextFilter column="RE" onFilterChange={(value) => setColaboradorFilter({ ...colaboradorFilter, RE: value })} />
						</>
					)}

					{selectedTab === 7 && (
						<>
							<TextFilter column="description" onFilterChange={(value) => setTurnoFilter({ ...turnoFilter, description: value })} />
						</>
					)}

					{selectedTab === 8 && (
						<>
							<TextFilter column="name" onFilterChange={(value) => setUsuarioFilter({ ...usuarioFilter, name: value })} />
							<TextFilter column="userName" onFilterChange={(value) => setUsuarioFilter({ ...usuarioFilter, userName: value })} />
							<TextFilter column="email" onFilterChange={(value) => setUsuarioFilter({ ...usuarioFilter, email: value })} />
						</>
					)}
				</div>
				{selectedTab !== 8 &&
					<div>
						<Button onClick={() => setShowFormModal(true)} variant='primary'><FaPlus size={24} /></Button>
					</div>
				}
			</div>
			<AnimatedContainer
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				key={selectedTab}
				className='page-content'>
				{selectedTab === 0 && <AreaTable data={tableData as IArea[]} onAtualizar={resgatarArea} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 1 && <SubAreaTable data={tableData as ISubArea[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />} {/*Falta fazer o delete e o atualizar, nn esquecer de fazer o bgl de atualizar*/}
				{selectedTab === 2 && <LinhaTable data={tableData as ILinha[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 3 && <MaquinaTable data={tableData as IMaquina[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 4 && <ComponenteTable data={tableData as IComponente[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 5 && <CategoriaTecnicaTable data={tableData as ICategoriaTecnica[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 6 && <ColaboradorTable data={tableData as IColaborador[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 7 && <TurnoTable data={tableData as ITurno[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{selectedTab === 8 && <UsuarioTable data={tableData as IUsuario[]} onClickDelete={handleConfirmationModal} onClickEdit={onClickEdit} />}
				{/* {selectedTab === 2 && <CategoriaTable data={tableData as ICategoriaColaborador[]} />} */}
				{/* {selectedTab === 4 && <ChamadoTable data={tableData as IChamado[]} />} */}
				{/* {selectedTab === 7 && <EmpresaTable data={tableData as IEmpresa[]} />}
				{selectedTab === 8 && <EventosTable data={tableData as IEventos[]} />} */}
			</AnimatedContainer>

			{renderPaginate && (
				<Pagination
					currentPage={currentPage}
					onChange={(page) => {
						onPaginate(page);
					}}
					totalAmountOfPages={amountOfPages - 1}
				/>)}

			<FormModal
				title={(formData.id ? "Editar" : "Criar ") + " " + tabsArray[selectedTab]}
				onClose={() => setShowFormModal(false)}
				onSubmit={async () => {
					if (await updateForm(formData)) {
						{ selectedTab === 0 && resgatarArea(); }
						{ selectedTab === 1 && resgatarSubArea(); }
						{ selectedTab === 2 && resgatarLinha(); }
						{ selectedTab === 3 && resgatarMaquina(); }
						{ selectedTab === 4 && resgatarComponente(); }
						{ selectedTab === 5 && resgatarCategoria(); }
						{ selectedTab === 6 && resgatarColaborador(); }
						{ selectedTab === 7 && resgatarTurno(); }
						{ selectedTab === 8 && resgatarUsuario(); }
						setShowFormModal(false)
					}

					if (await onSubmitFormData(selectedTab, formData)) {
						{ selectedTab === 0 && resgatarArea(); }
						{ selectedTab === 1 && resgatarSubArea(); }
						{ selectedTab === 2 && resgatarLinha(); }
						{ selectedTab === 3 && resgatarMaquina(); }
						{ selectedTab === 4 && resgatarComponente(); }
						{ selectedTab === 5 && resgatarCategoria(); }
						{ selectedTab === 6 && resgatarColaborador(); }
						{ selectedTab === 7 && resgatarTurno(); }
						{ selectedTab === 8 && resgatarUsuario(); }
						setShowFormModal(false)
					}
				}}
				isOpen={showFormModal}>
				{selectedTab === 0 && <FormArea errors={errors} onChange={onChangeFormData} data={formData as IArea} />}
				{selectedTab === 1 && <FormSubArea errors={errors} onChange={onChangeFormData} data={formData as ISubArea} />}
				{selectedTab === 2 && <FormLinha errors={errors} onChange={onChangeFormData} data={formData as ILinha} />}
				{selectedTab === 3 && <FormMaquina errors={errors} onChange={onChangeFormData} data={formData as IMaquina} />}
				{selectedTab === 4 && <FormComponente errors={errors} onChange={onChangeFormData} data={formData as IComponente} />}
				{selectedTab === 5 && <FormCategoriaTecnica errors={errors} onChange={onChangeFormData} data={formData as ICategoriaTecnica} />}
				{selectedTab === 6 && <FormColaborador errors={errors} onChange={onChangeFormData} data={formData as IColaborador} />}
				{selectedTab === 7 && <FormTurno errors={errors} onChange={onChangeFormData} data={formData as ITurno} />}
				{/* {selectedTab === 7 && <FormEmpresa errors={errors} onChange={onChangeFormData} data={formData as IEmpresa} />} */}
				{/* {selectedTab === 8 && <FormEventos errors={errors} onChange={onChangeFormData} data={formData as IEventos} />} */}
				{/* {selectedTab === 2 && <FormCategoriaColaborador errors={errors} onChange={onChangeFormData} data={formData as ICategoriaColaborador} />} */}
			</FormModal>

			<ConfirmationModal onConfirm={() => handleConfirm()} isOpen={showConfirmationModal} onCancel={() => handleConcelModal()} />
		</div>

	);
};
