import {number, object, string } from "yup";

   export const maquinaSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      order:number().typeError({id:'order', message:"o campo deve ser um número"}).required({id:'order', message:"preencha o campo de ordem"}),
      idLine:number().typeError({id:'idLine', message:"o campo deve ser um número"}).required({id:'idLine', message:"preencha o campo de linha"}),
   })
