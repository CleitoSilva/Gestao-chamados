import { useState } from "react";
import { AreaService, CategoriaTecnincaService, LinhaService, MaquinaService, SubAreaService } from "../../../service";
import { IArea } from "../../../interfaces/IArea";
import { UseNotification } from "../../../hooks/useNotification";
import { ISubArea } from "../../../interfaces/ISubArea";
import { ILinha } from '../../../interfaces/ILinha';
import { IMaquina } from '../../../interfaces/IMaquina';
import { ICategoriaTecnica } from '../../../interfaces/ICategoriaTecnica';

export const UseConfigHook = () => { 
  //Estados
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { notify } = UseNotification();
  //Lista de abas
  const tabsArray = [
    "Área",
    "Subárea",
    "Linha",
    "Máquina",
    "Categoria Técnica",
  ]; 

  const resgatarArea = async () => {
    try {
      const arrayArea =  await AreaService.GetAllAreas() as IArea[];
      return arrayArea;
    } catch (error) {
      notify.error("Houve um erro ao resgatar as áreas");
    }
  }

  const resgatarSubArea = async () => {
    try {
      const arrayArea =  await SubAreaService.GetAllSubAreas() as ISubArea[];
      return arrayArea;
    } catch (error) {
      notify.error("Houve um erro ao resgatar as áreas");
    }
  }

  const resgatarLinha = async () => {
    try {
      const arrayArea =  await LinhaService.GetAllLinhas() as ILinha[];
      return arrayArea;
    } catch (error) {
      notify.error("Houve um erro ao resgatar as áreas");
    }
  }

  const resgatarMaquina = async () => {
    try {
      const arrayArea =  await MaquinaService.GetAllMachines() as IMaquina[];
      return arrayArea;
    } catch (error) {
      notify.error("Houve um erro ao resgatar as áreas");
    }
  }

  const resgatarCategoria = async () => {
    try {
      const arrayArea =  await CategoriaTecnincaService.GetAllCategoriaTecnica() as ICategoriaTecnica[];
      return arrayArea;
    } catch (error) {
      notify.error("Houve um erro ao resgatar as áreas");
    }
  }

  return {
    tabsArray,
    selectedTab,
    setSelectedTab,
    resgatarArea,
    resgatarSubArea,
    resgatarLinha,
    resgatarMaquina,
    resgatarCategoria
  };
}