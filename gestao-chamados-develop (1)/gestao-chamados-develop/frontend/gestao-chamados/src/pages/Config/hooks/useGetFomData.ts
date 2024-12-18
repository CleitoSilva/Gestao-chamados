import { useEffect, useState } from "react";
// import { LimitsService, LinesService, MachinesService, ParametersService, RecipesService, ShiftsService } from "../../../service";
// import {formScheema as lineScheema } from "../components/Lines";
// import {formScheema as machineScheema} from "../components/Machines";
// import {formScheema as parameterScheema} from "../components/Parameters";
// import {formScheema as recipeScheema} from "../components/Recipes";
// import {formScheema as shiftScheema} from "../components/Shift";
// import {formScheema as limitScheema} from "../components/Limits";
import { UseValidateForm } from "./useValidateForm";
import { IEmpresa } from "../../../interfaces/IEmpresa";
import {
  AreaService,
  CategoriaColaboradorService,
  CategoriaTecnincaService,
  ColaboradorService,
  ComponenteService,
  EmpresaService,
  LinhaService,
  MaquinaService,
  SubAreaService,
  TurnoService,
} from "../../../service";
import { UseNotification } from "../../../hooks/useNotification";
import { IArea } from "../../../interfaces/IArea";
import { ICategoriaColaborador } from "../../../interfaces/ICategoriaColaborador";
import { ICategoriaTecnica } from "../../../interfaces/ICategoriaTecnica";
import { ISubArea } from "../../../interfaces/ISubArea";
import { ITurno } from "../../../interfaces/ITurno";
import { ILinha } from "../../../interfaces/ILinha";
import { IMaquina } from "../../../interfaces/IMaquina";
import { IComponente } from "../../../interfaces/IComponente";
import { IColaborador } from "../../../interfaces/IColaborador";
import { areaSchema } from "../Components/Area/areaSchema";
import { subAreaSchema } from "../Components/SubArea/subAreaSchema";
import { categoriaSchema } from "../Components/CategoriaColaborador/categoriaSchema";
import { categoriaTecnicaSchema } from "../Components/CategoriaTecnica/categoriaTecnicaSchema";
import { colaboradorSchema } from "../Components/Colaborador/colaboradorSchema";
import { componenteSchema } from "../Components/Componente/componenteSchema";
import { turnoSchema } from "../Components/Turno/turnoSchema";
import { maquinaSchema } from "../Components/Maquina/maquinaSchema";
import { linhaSchema } from "../Components/Linha/linhaSchema";
import { UseConfigHook } from "./useConfigHook";
import { FormType } from "../../../@types";

export const UseGetFormData = <T>(tabSelected?: number) => {
  const [formData, setFormData] = useState({} as T);
  const initialFormData = {} as T;
  const { notify } = UseNotification();
  const { validateForm, errors } = UseValidateForm();
  const onChangeFormData = (key: string, value: string | boolean | number) => {
    //Setando o valor no estado
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmitFormData = async (tabSelected: number, dataToSubmit: T) => {
    let result = false;
    if (tabSelected === 0) result = await handleArea(dataToSubmit as IArea);
    if (tabSelected === 1) result = await handleSubArea(dataToSubmit as ISubArea);
    if (tabSelected === 2) result = await handleLinha(dataToSubmit as ILinha);
    if (tabSelected === 3) result = await handleMaquina(dataToSubmit as IMaquina);
    if (tabSelected === 4) result = await handleComponente(dataToSubmit as IComponente);
    if (tabSelected === 5) result = await handleCategoriaTecninca(dataToSubmit as ICategoriaTecnica);
    if (tabSelected === 6) result = await handleColaborador(dataToSubmit as IColaborador);
    if (tabSelected === 7) result = await handleTurno(dataToSubmit as ITurno);
    // if (tabSelected === 7) return await handleEmpresa(dataToSubmit as IEmpresa);
    // if (tabSelected === 2) return await handleCategoriaColaborador(dataToSubmit as ICategoriaColaborador);

    if (result) {
      // setAtualizarTabela(atualizarTabela + 1);
      setFormData(initialFormData);
    }

    return result;
  };

  const handleArea = async (areaToSubmit: IArea) => {
    const formDataSubmit = areaToSubmit as IArea;
    //validateform
    if (!(await validateForm(areaSchema, formData as IArea)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await AreaService.CreateArea(areaToSubmit as IArea);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleCategoriaTecninca = async (categoriaTecnicaToSubmit: ICategoriaTecnica) => {
    const formDataSubmit = categoriaTecnicaToSubmit as ICategoriaTecnica;

    //validateform
    if (!(await validateForm(categoriaTecnicaSchema, formData as ICategoriaTecnica)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await CategoriaTecnincaService.createCategoriaTecnica(formDataSubmit);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleLinha = async (linhaToSubmit: ILinha) => {
    const formDataSubmit = linhaToSubmit as ILinha;
    //validateform
    if (!(await validateForm(linhaSchema, formData as ILinha)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      console.log(formDataSubmit);
      await LinhaService.createLinha(formDataSubmit);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleMaquina = async (turnoToSubmit: IMaquina) => {
    const formDataSubmit = turnoToSubmit as IMaquina;
    //validateform
    if (!(await validateForm(maquinaSchema, formData as IMaquina)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await MaquinaService.createMaquina(turnoToSubmit as IMaquina);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleSubArea = async (subAreaToSubmit: ISubArea) => {
    const formDataSubmit = subAreaToSubmit as ISubArea;
    //validateform
    if (!(await validateForm(subAreaSchema, formData as ISubArea)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await SubAreaService.createSubArea(formDataSubmit);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleComponente = async (componenteToSubmit: IComponente) => {
    const formDataSubmit = componenteToSubmit as IComponente;
    //validateform
    if (!(await validateForm(componenteSchema, formData as IComponente)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await ComponenteService.createComponente(formDataSubmit);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleTurno = async (turnoToSubmit: ITurno) => {
    const formDataSubmit = turnoToSubmit as ITurno;
    //validateform
    if (!(await validateForm(turnoSchema, formData as ITurno)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await TurnoService.createTurno(turnoToSubmit as ITurno);
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleColaborador = async (colaboradorToSubmit: IColaborador) => {
    const formDataSubmit = colaboradorToSubmit as IColaborador;
    //validateform
    if (!(await validateForm(colaboradorSchema, formData as IColaborador)).valueOf()) {
      notify.error("Preencha todos os campos corretamente!");
      return false;
    }

    if (formDataSubmit.id) {
      //await EmpresaService.Update(formDataSubmit);
      return true;
    } else {
      await ColaboradorService.createColaborador(
        colaboradorToSubmit as IColaborador
      );
      notify.success("Cadastro realizado com sucesso!");
      return true;
    }
  };

  const handleEdit = (e: T) => {
    setFormData(e);
  }

  useEffect(() => {
    if (tabSelected === 0) validateForm(areaSchema, formData as IArea);
    if (tabSelected === 1) validateForm(subAreaSchema, formData as ISubArea);
    if (tabSelected === 2) validateForm(linhaSchema, formData as ILinha);
    if (tabSelected === 3) validateForm(maquinaSchema, formData as IMaquina);
    if (tabSelected === 4) validateForm(componenteSchema, formData as IComponente);
    if (tabSelected === 5) validateForm(categoriaTecnicaSchema, formData as ICategoriaTecnica);
    if (tabSelected === 6) validateForm(turnoSchema, formData as ITurno);
    if (tabSelected === 7) validateForm(colaboradorSchema, formData as IColaborador);
    // if (tabSelected === 2) validateForm(categoriaSchema, formData as ICategoriaColaborador);
  }, [tabSelected, formData]);

  return { formData, onChangeFormData, onSubmitFormData, setFormData, handleEdit, errors };
};
