import { TicketStatus } from "../enums/TicketStatusEnum"

export const GetTicketStatus = (status: number) => {
  switch(status) {
    case TicketStatus.OPEN:
      return "ABERTO"
    case TicketStatus.RUNNING:
      return "EM ATENDIMENTO"
    case TicketStatus.PAUSED:
      return "PAUSADO"
    case TicketStatus.CANCELED:
      return "CANCELADO"
    case TicketStatus.FINISH:
      return "FINALIZADO"
  }
}