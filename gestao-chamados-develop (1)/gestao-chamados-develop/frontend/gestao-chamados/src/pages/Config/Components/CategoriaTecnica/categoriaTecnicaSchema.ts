import {number, object, string } from "yup";

   export const categoriaTecnicaSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      typeCategory:number().typeError({id:'typeCategory', message:"o campo deve ser um número"}).required({id:'typeCategory', message:"preencha o campo de tipo de categoria"}),
      // idArea:number().typeError({id:'idAreaLocationCover', message:"o campo deve ser um número"}).required({id:'idAreaLocationCover', message:"preencha o campo de área"}),
   })
