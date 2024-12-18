import {object, string } from "yup";

   export const areaSchema = object().shape({
      name:string().required({id:'name', message:"preencha o campo nome"}),
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
   })
