import {number, object, string } from "yup";

   export const componenteSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      idMachine:number().typeError({id:'idMachine', message:"o campo deve ser um número"}).required({id:'idMachine', message:"preencha o campo de máquina"}),
   })
