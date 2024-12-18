import {number, object, string} from "yup";

   export const turnoSchema = object().shape({
      description:string().required({id:'description', message:"preencha o campo de descrição"}),
      startHour:string().required({id:'startHour', message:"preencha o campo de início"}),
      endHour:string().required({id:'endHour', message:"preencha o campo de fim"}),
   })
