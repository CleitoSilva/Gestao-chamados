import { TechStatus } from "../enums/TechStatusEnum"

export const GetTechStatus = (status: number) => {
  switch(status) {
    case TechStatus.WAITING:
      return "AGUARDANDO"
    case TechStatus.ONSERVICE:
      return "EM ATENDIMENTO"
    case TechStatus.EVERYBODYLEAVE:
      return "ABANDONADO"
    default:
      return "SEM STATUS"
  }
}