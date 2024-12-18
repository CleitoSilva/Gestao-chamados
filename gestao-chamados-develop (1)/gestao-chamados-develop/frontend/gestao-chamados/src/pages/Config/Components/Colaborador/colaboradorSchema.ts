import {number, object, string } from "yup";

   export const colaboradorSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      badgeCardNumber:string().required({id:'badgeCardNumber', message:"preencha o campo de crachá"}),
      rfidCardNumber:string().required({id:'rfidCardNumber', message:"preencha o campo de RFID"}),
      reNumber:string().required({id:'reNumber', message:"preencha o campo de RE"}),
      // idColaboratorCategory:number().typeError({id:'idColaboratorCategory', message:"o campo deve ser um número"}).required({id:'idColaboratorCategory', message:"preencha o campo de categoria"}),
      // idTechniqueCategory:number().typeError({id:'idTechniqueCategory', message:"o campo deve ser um número"}),
      // idShift:number().typeError({id:'idShift', message:"o campo deve ser um número"}).required({id:'idShift', message:"preencha o campo de turno"}),
      // idLine:number().typeError({id:'idLine', message:"o campo deve ser um número"}).required({id:'idLine', message:"preencha o campo de linha"}),
   })
