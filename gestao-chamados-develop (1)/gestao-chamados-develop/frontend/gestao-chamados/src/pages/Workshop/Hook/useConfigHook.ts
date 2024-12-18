import { useEffect, useState } from "react";
// import { FormType, TableDataType } from "../../../@types";
import { FormType, TableDataType } from "../../../@types";
import { UseNotification } from "../../../hooks/useNotification";
import { TicketsService } from "../../../service";
import { IChamado } from "../../../interfaces/IChamado";

export const UseConfigHook = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  // const { state } = useLocation();
  const { notify } = UseNotification();
  const [showFormModal, setShowFormModal] = useState(false);
  const [tableData, setTableData] = useState<TableDataType>(); //Modelo tabela
  const [renderPaginate, setRenderPaginate] = useState(false);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onPaginate = (page: number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    if (amountOfPages > 1) setRenderPaginate(true);
    if (amountOfPages <= 1) setRenderPaginate(false);
  }, [amountOfPages]);

  return {
    selectedTab,
    setSelectedTab,
    setTableData,
    tableData,
    setShowFormModal,
    showFormModal,
    renderPaginate,
    onPaginate,
    currentPage,
    amountOfPages,
    setAmountOfPages
  };
}
