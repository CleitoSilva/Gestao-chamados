import {number, object, string } from "yup";

   export const subAreaSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      idArea:number().typeError({id:'idArea', message:"o campo deve ser um número"}).required({id:'idArea', message:"preencha o campo área"}),
   })
