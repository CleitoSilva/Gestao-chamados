import { TicketStatus } from "../enums/TicketStatusEnum"

export const GetTicketColor = (status: number) => {
  switch(status) {
    case TicketStatus.OPEN:
      return "#BF9910"
    case TicketStatus.RUNNING:
      return "#0BAE7D"
    case TicketStatus.PAUSED:
      return "#6b6b6b"
    case TicketStatus.CANCELED:
      return "#3b3b3b"
    case TicketStatus.FINISH:
      return "#005EFF"
  }
}