export const EnumStatus = (number: number) => {
  switch (number) {
    case 1:
        return "Aberto"
    case 2:
        return "Em atendimento"
    case 3:
        return "Pausado"
  }
};
