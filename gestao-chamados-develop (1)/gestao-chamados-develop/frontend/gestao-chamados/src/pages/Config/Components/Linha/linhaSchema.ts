import {number, object, string } from "yup";

   export const linhaSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      number:number().typeError({id:'number', message:"o campo deve ser um número"}).required({id:'number', message:"preencha o campo de número"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      idArea:number().typeError({id:'idArea', message:"o campo deve ser um número"}).required({id:'idArea', message:"preencha o campo de área"}),
      idSubArea:number().typeError({id:'idSubArea', message:"o campo deve ser um número"}),
   })
