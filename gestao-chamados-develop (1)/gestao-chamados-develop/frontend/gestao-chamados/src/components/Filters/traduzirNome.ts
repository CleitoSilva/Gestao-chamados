export const traduzirNome = (column: string) => {
  let valorOficial = "";
  switch (column) {
    case "name":
      valorOficial = "Nome";
      break;
    case "number":
      valorOficial = "Número";
      break;
    case "description":
      valorOficial = "Descrição";
      break;
    case "line":
      valorOficial = "Linha";
      break;
    case "condition":
      valorOficial = "Condição";
      break;
    case "machine":
      valorOficial = "Máquina";
      break;
    case "type":
      valorOficial = "Tipo";
      break;
    case "parameter":
      valorOficial = "Parâmetro";
      break;
    case "recipe":
      valorOficial = "Receita";
      break;
    case "minValue":
      valorOficial = "Mínimo";
      break;
    case "maxValue":
      valorOficial = "Máximo";
      break;
    case "targetValue":
      valorOficial = "Target";
      break;
    case "linha":
      valorOficial = "Linha";
      break;
    case "maquina":
      valorOficial = "Máquina";
      break;
    case "receita":
      valorOficial = "Receita";
      break;
    case "parametro":
      valorOficial = "Parâmetro";
      break;
    case "idEnterpise":
      valorOficial = "Empresa";
      break;
    case "order":
      valorOficial = "Ordem";
      break;
    case "start":
      valorOficial = "Início";
      break;
    case "end":
      valorOficial = "Fim";
      break;
    case "RFID":
      valorOficial = "RFID";
      break;
    case "Crachá":
      valorOficial = "Crachá";
      break;
    case "RE":
      valorOficial = "RE";
      break;
    case "userName":
      valorOficial = "User";
      break;
    case "email":
      valorOficial = "E-mail";
      break;
    case "Data":
      valorOficial = "Data";
      break;
    default:
      break;
  }
  return valorOficial;
};
