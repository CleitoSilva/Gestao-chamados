import { useContext, useEffect, useState } from "react";
import { TabSelector } from "./Components/TabSelector";
import style from "./CriacaoChamado.styles.module.css";
import { UseConfigHook } from "./hooks/useConfigHook";
import { AnimatedContainer } from "../../components";
import { IArea } from "../../interfaces/IArea";
import areaIcon from "../../assets/images/area-icon.png";
import { IChamado } from "./Interfaces/IChamado";
import { ISubArea } from "../../interfaces/ISubArea";
import { ILinha } from "../../interfaces/ILinha";
import { IMaquina } from "../../interfaces/IMaquina";
import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { IChamadoNames } from "./Interfaces/IChamadoNames";
import { ColaboradorService, EmpresaService, TicketsService } from "../../service";
import { IColaborador } from "../../interfaces/IColaborador";
import { UseNotification } from "../../hooks/useNotification";
import { onChange } from "react-toastify/dist/core/store";
import { UserContext } from "../../contexts/UserContext";
import { IEmpresa } from "../../interfaces/IEmpresa";

export const CriacaoChamado = () => {
	const [data, setData] = useState<(IArea | ISubArea | ILinha | IMaquina | ICategoriaTecnica)[]>();
	const [idOpenColaborator, setIdOpenColaborator] = useState(0);
	const [chamado, setChamado] = useState<IChamado>({ idOpenColaborator: 0, idArea: 0, idSubArea: 0, idLine: 0, idMachine: 0, idTechniqueCategory: 0, idEnterprise: "" });
	const [chamadoNames, setChamadoNames] = useState<IChamadoNames>({ nameArea: "", nameSubArea: "", nameLine: "", nameMachine: "", nameTechniqueCategory: "" });
	const [identicacao, setIdentificacao] = useState("");
	const [previousTab, setPreviousTab] = useState(0);
	const { notify } = UseNotification();
	const { user } = useContext(UserContext);

	const {
		tabsArray,
		selectedTab,
		setSelectedTab,
		resgatarArea,
		resgatarSubArea,
		resgatarLinha,
		resgatarMaquina,
		resgatarCategoria
	} = UseConfigHook();

	// useEffect usada para resatar os filtros quando se muda de aba e resetar paginação
	useEffect(() => {
		setData(undefined);
		switch (selectedTab) {
			case 0:
				setAreas();
				break;
			case 1:
				setSubAreas();
				break;
			case 2:
				setLinha();
				break;
			case 3:
				setMaquina();
				break;
			case 4:
				setCategoria();
				break;
			default:
				break;
		}

		if (previousTab > selectedTab) {
			limparEscolha();
		}

		setPreviousTab(selectedTab);
	}, [selectedTab]);

	useEffect(() => {
		const fetchEmpresa = async () => {
		  if (user?.idEnterprise) {
			const empresaData = await EmpresaService.getEmpresaById(user.idEnterprise) as IEmpresa;
			setChamado(prevState => ({ ...prevState, idEnterprise: empresaData.id}));
		  }
		};
	
		fetchEmpresa();
	}, [user]);
	
	const setAreas = async () => {
		const areas = await resgatarArea() as IArea[];
		setData(areas);
	};

	const setSubAreas = async () => {
		const subAreas = await resgatarSubArea() as ISubArea[];
		setData(subAreas.filter((subarea) => String(subarea.area?.id) === String(chamado.idArea)));
	};

	const setLinha = async () => {
		const linhas = await resgatarLinha() as ILinha[];
		if (chamado.idSubArea !== 0 && chamado.idSubArea !== undefined ) {
			setData(linhas.filter((linha) => String(linha.area?.id) === String(chamado.idArea)).filter((linha) => String(linha.subArea?.id) === String(chamado.idSubArea)));
		} else {
			setData(linhas.filter((linha) => String(linha.area?.id) === String(chamado.idArea)));
		}
	};

	const setMaquina = async () => {
		const maquinas = await resgatarMaquina() as IMaquina[];
		setData(maquinas.filter((maquina) => String(maquina.line?.id) === String(chamado.idLine)));
	};

	const setCategoria = async () => {
		const areas = await resgatarCategoria() as ICategoriaTecnica[];
		setData(areas);
	};

	//Função para salvar a informação e ir para próxima página
	const handleClick = (id: number, name: string) => {
		//Salvando IDS
		if (selectedTab === 0) { setChamado(prevState => ({ ...prevState, idArea: id })); }
		if (selectedTab === 1) { setChamado(prevState => ({ ...prevState, idSubArea: id })); }
		if (selectedTab === 2) { setChamado(prevState => ({ ...prevState, idLine: id })); }
		if (selectedTab === 3) { setChamado(prevState => ({ ...prevState, idMachine: id })); }
		if (selectedTab === 4) { setChamado(prevState => ({ ...prevState, idTechniqueCategory: id })); }

		//Salvando os nomes
		if (selectedTab === 0) { setChamadoNames(prevState => ({ ...prevState, nameArea: name })); }
		if (selectedTab === 1) { setChamadoNames(prevState => ({ ...prevState, nameSubArea: name })); }
		if (selectedTab === 2) { setChamadoNames(prevState => ({ ...prevState, nameLine: name })); }
		if (selectedTab === 3) { setChamadoNames(prevState => ({ ...prevState, nameMachine: name })); }
		if (selectedTab === 4) { setChamadoNames(prevState => ({ ...prevState, nameTechniqueCategory: name })); }
		setSelectedTab((selectedTab + 1));
	}

	// Função para enviar o Chamado
	const handleTicket = async () => {
		try {
			// Obtém a lista de colaboradores
			const colaboradores = await ColaboradorService.GetAllColaboradores() as IColaborador[];

			console.log("Valor recebido: " + identicacao);
			// Encontra o colaborador com o número do crachá especificado
			const colaborador = colaboradores.find(colab => colab.badgeCardNumber === identicacao);

			if (colaborador === undefined) {
				notify.error("Colaborador não encontrado");
				return null;
			}

			//Salvando id
			setChamado(prevState => ({ ...prevState, idOpenColaborator: Number(colaborador?.id) }));

			// Incrementa a aba selecionada
			setSelectedTab(selectedTab + 1);

			setIdOpenColaborator(1);
		} catch (error) {
			// Lida com erros
			console.error('Erro ao buscar colaboradores:', error);
		}
	};

	useEffect(() => {
		// Criando o chamado
		if (chamado.idOpenColaborator !== 0 && chamado.idOpenColaborator !== undefined && idOpenColaborator !== 0) {
			createTicket();
		}
	}, [idOpenColaborator]);

	//Enviando o Ticket
	const createTicket = async () => {
		if (chamado.idSubArea === 0) {
			setChamado(prevState => ({ ...prevState, idSubArea: undefined }));
		}
		await TicketsService.CreateTicket(chamado).then(() => notify.success("Chamado aberto com sucesso!")).catch(() => notify.error("Houve um erro ao abrir o chamado!"));
		setSelectedTab(0);
		limparEscolha();
		setIdOpenColaborator(0);
	}

	//Função para enviar o Chamdo
	const limparEscolha = () => {
		if (selectedTab === 0) {
			setChamado(prevState => ({ ...prevState, idArea: 0 }));
			setChamado(prevState => ({ ...prevState, idSubArea: 0 }));
			setChamado(prevState => ({ ...prevState, idLine: 0 }));
			setChamado(prevState => ({ ...prevState, idMachine: 0 }));
			setChamado(prevState => ({ ...prevState, idTechniqueCategory: 0 }));
		} else if (selectedTab === 1) {
			setChamado(prevState => ({ ...prevState, idSubArea: 0 }));
			setChamado(prevState => ({ ...prevState, idLine: 0 }));
			setChamado(prevState => ({ ...prevState, idMachine: 0 }));
			setChamado(prevState => ({ ...prevState, idTechniqueCategory: 0 }));
		} else if (selectedTab === 2) {
			setChamado(prevState => ({ ...prevState, idLine: 0 }));
			setChamado(prevState => ({ ...prevState, idMachine: 0 }));
			setChamado(prevState => ({ ...prevState, idTechniqueCategory: 0}));
		} else if (selectedTab === 3) {
			setChamado(prevState => ({ ...prevState, idMachine: 0 }));
			setChamado(prevState => ({ ...prevState, idTechniqueCategory: 0 }));
		} else if (selectedTab === 4) {
			setChamado(prevState => ({ ...prevState, idTechniqueCategory: 0 }));
		}
	}

	return (
		<div className={style["config-page"]}>
			<div className={style["config-header"]}>
				<div className={style["tabination"]}>
					<TabSelector
						onClickTab={(tab) => setSelectedTab(tab)}
						activeTab={selectedTab}
						tabs={tabsArray}
					/>
				</div>
				<div className={style["selected-info"]}>
					<ul className={style["selected-info-list"]}>
						{chamado.idArea !== 0 && <li className={style["selected-info-item"]}>{chamadoNames.nameArea}</li>}
						{chamado.idSubArea !== 0 && <li className={style["selected-info-item"]}>{chamadoNames.nameSubArea}a</li>}
						{chamado.idLine !== 0 && <li className={style["selected-info-item"]}>{chamadoNames.nameLine}</li>}
						{chamado.idMachine !== 0 && <li className={style["selected-info-item"]}>{chamadoNames.nameMachine}</li>}
						{chamado.idTechniqueCategory !== 0 && <li className={style["selected-info-item"]}>{chamadoNames.nameTechniqueCategory}</li>}
					</ul>
				</div>
			</div>
			<div className={style["title-page"]}>
				{selectedTab === 0 ? (
					<h3 className={style["frase-guia-open"]}>
						Olá, para abrir o chamado comece escolhendo a sua{" "}
						<span className={style["impact-world"]}>{tabsArray[0]}</span>:
					</h3>
				) : (
					selectedTab < 5 ? (
						<h3 className={style["frase-guia"]}>
							Escolha a sua{" "}
							<span className={style["impact-world"]}>{tabsArray[selectedTab]}</span>:
						</h3>
					) : (selectedTab === 5 ? (
						<h3 className={style["frase-guia-open"]}>
							Para finalizar se identifique com o <span className={style["impact-world"]}>Crachá</span>
						</h3>) : (
						<h3 className={style["frase-guia-open"]}>
							<span className={style["impact-world"]}>Chamado</span> aberto com sucesso!
						</h3>)
					)
				)}
			</div>
			<AnimatedContainer
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				key={selectedTab}
				className="page-content"
			>
				<div className={style["content"]}>
					{data?.map((item, index) => (
						<div key={index} onClick={() => handleClick(Number(item.id), item.name)} className={style["item"]}>
							<img className={style["img-icon"]} src={areaIcon} alt="" />
							<h3 className={style["text-img"]}>{item.name}</h3>
						</div>
					))}
					{selectedTab === 1 &&
						<div className={style["item"]} onClick={() => setSelectedTab(selectedTab+1)}>
							<img className={style["img-icon"]} src={areaIcon} alt="" />
							<h3 className={style["text-img"]}>Nenhuma</h3>
						</div>}
				</div>
				{selectedTab === 5 &&
					<div className={style["final-form"]}>
						<div >
							<h4>Identificação:</h4>
						</div>
						<div className={style["input-toggle"]}>
							<input placeholder="Digite seu Crachá" className={style["input-ident"]} type="text" required onBlur={(e) => setIdentificacao(e.target.value)} />
							<button className={style["sent-button"]} onClick={handleTicket}>Enviar</button>
						</div>
					</div>}
			</AnimatedContainer>
			{(selectedTab !== 0) && <button className={style["back-button"]} onClick={() => {
				setSelectedTab((selectedTab - 1));
				limparEscolha();
			}}>Voltar</button>}
		</div>
	);
};
