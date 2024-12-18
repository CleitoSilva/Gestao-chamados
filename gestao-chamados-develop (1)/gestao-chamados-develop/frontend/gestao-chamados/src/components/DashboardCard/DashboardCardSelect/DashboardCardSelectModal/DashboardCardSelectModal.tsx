import { FC, ReactNode } from "react"
import './DashboardCardSelectModal.styles.css'
import { AnimatedContainer } from "../../..";

interface DashboardCardSelectModalProps{
  isOpen:boolean;
  children:ReactNode;
  onClose?:()=>void;
}

export const DashboardCardSelectModal:FC<DashboardCardSelectModalProps> = ({ children, onClose, isOpen}) => {
  return isOpen ? (
    <AnimatedContainer style={{zIndex:1000}} className="dashbaord-card-select-modal-container">
      <div className="dashbaord-card-select-modal-card">
        {children}
      </div>
      <div onClick={()=>onClose && onClose()} className="dashboard-card-select-overlay"/>    
    </AnimatedContainer>
  ) : null
}
