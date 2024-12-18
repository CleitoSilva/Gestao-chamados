import { TechStatus } from "../enums/TechStatusEnum"

export const GetTechColor = (status: number) => {
  switch(status) {
    case TechStatus.WAITING:
      return "#BF9910";
    case TechStatus.ONSERVICE:
      return "#10BF80";
    case TechStatus.EVERYBODYLEAVE:
      return "#BF3A10";
    default:
      return "#000000";
  }
}