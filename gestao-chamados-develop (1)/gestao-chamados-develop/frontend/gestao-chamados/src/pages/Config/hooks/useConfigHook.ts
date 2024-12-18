import { useEffect, useState } from "react";
// import { FormType, TableDataType } from "../../../@types";
import { FormType, TableDataType } from "../../../@types";
import { UseNotification } from "../../../hooks/useNotification";
import { UseGetFormData } from "./useGetFomData";
import { AreaService, CategoriaTecnincaService, ColaboradorService, ComponenteService, LinhaService, MaquinaService, SubAreaService, TurnoService, UsuarioService } from "../../../service";
import { IArea } from "../../../interfaces/IArea";
import { subAreaSchema } from "../Components/SubArea/subAreaSchema";
import { ISubArea } from "../../../interfaces/ISubArea";
import { ILinha } from "../../../interfaces/ILinha";
import { IMaquina } from "../../../interfaces/IMaquina";
import { IComponente } from "../../../interfaces/IComponente";
import { ICategoriaTecnica } from "../../../interfaces/ICategoriaTecnica";
import { ITurno } from "../../../interfaces/ITurno";
import { IColaborador } from "../../../interfaces/IColaborador";
import { IUsuario } from "../../../interfaces/IUsuario";


export const UseConfigHook = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  // const { state } = useLocation();
  const { notify } = UseNotification();
  const [showFormModal, setShowFormModal] = useState(false);
  const [tableData, setTableData] = useState<TableDataType>(); //Modelo tabela
  const { formData, onChangeFormData, onSubmitFormData, handleEdit, errors } =
  UseGetFormData<FormType>(selectedTab);
  const [renderPaginate, setRenderPaginate] = useState(false);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //Lista de abas
  const tabsArray = [
    "01. Área",
    "02. Subárea",
    "03. Linha",
    "04. Máquina",
    "05. Componente",
    "06. Categoria Técnica",
    "07. Colaborador",
    "08. Turno",
    "09. Usuário"
  ];

  const onPaginate = (page: number) => {
    setCurrentPage(page);
  };

  const onClickDelete = async (id: string) => {
    if (selectedTab === 0) {
      await AreaService.DeleteArea(id).then(() => { notify.success(`A área foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar a área`)});
    }

    if (selectedTab === 1) {
      await SubAreaService.DeleteSubArea(id).then(() => { notify.success(`A subárea foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar a subárea`); console.log(error)});
    }

    if (selectedTab === 2) {
      await LinhaService.DeleteLinha(id).then(() => { notify.success(`A linha foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar a linha`); console.log(error)});
    }

    if (selectedTab === 3) {
      await MaquinaService.DeleteMaquina(id).then(() => { notify.success(`A máquina foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar a máquina`); console.log(error)});
    }

    if (selectedTab === 4) {
      await ComponenteService.DeleteComponente(id).then(() => { notify.success(`O componente foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar o componente`); console.log(error)});
    }

    if (selectedTab === 5) {
      await CategoriaTecnincaService.DeleteCategoriaTecnica(id).then(() => { notify.success(`A categoria foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar a categoria`); console.log(error)});
    }

    if (selectedTab === 6) {
      await ColaboradorService.DeleteColaborador(id).then(() => { notify.success(`O colaborador foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar o colaborador`); console.log(error)});
    }

    if (selectedTab === 7) {
      await TurnoService.DeleteTurno(id).then(() => { notify.success(`O turno foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar o turno`); console.log(error)});
    }

    if (selectedTab === 8) {
      await UsuarioService.DeleteUsuario(id).then(() => { notify.success(`O usuário foi deletada com sucesso.`)}).catch((error) => {notify.error(`Erro ao deletar o usuário`); console.log(error)});
    }
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTab]);

  useEffect(() => {
    if (amountOfPages > 1) setRenderPaginate(true);
    if (amountOfPages <= 1) setRenderPaginate(false);
  }, [amountOfPages]);

  //Deletar e editar
  const onClickEdit = (e: FormType) => {
    handleEdit(e);
    setShowFormModal(true);
  };

  const updateForm = async (e: FormType) => {
    if(selectedTab === 0) return AreaService.UpdateArea(e as IArea);
    if(selectedTab === 1) return SubAreaService.UpdateSubArea(e as ISubArea);
    if(selectedTab === 2) return LinhaService.UpdateLinha(e as ILinha);
    if(selectedTab === 3) return MaquinaService.UpdateMaquina(e as IMaquina);
    if(selectedTab === 4) return ComponenteService.UpdateComponents(e as IComponente);
    if(selectedTab === 5) return CategoriaTecnincaService.UpdateCategoriaTecninca(e as ICategoriaTecnica);
    if(selectedTab === 6) return ColaboradorService.UpdateColaborador(e as IColaborador);
    if(selectedTab === 7) return TurnoService.UpdateTurno(e as ITurno);
    if(selectedTab === 8) return UsuarioService.UpdateUsuario(e as IUsuario);
  }

  return {
    formData,
    tabsArray,
    selectedTab,
    setSelectedTab,
    setTableData,
    tableData,
    setShowFormModal,
    showFormModal,
    errors,
    onChangeFormData,
    onSubmitFormData,
    renderPaginate,
    onPaginate,
    onClickEdit,
    updateForm,
    onClickDelete,
    currentPage,
    amountOfPages,
    setAmountOfPages
  };
}
