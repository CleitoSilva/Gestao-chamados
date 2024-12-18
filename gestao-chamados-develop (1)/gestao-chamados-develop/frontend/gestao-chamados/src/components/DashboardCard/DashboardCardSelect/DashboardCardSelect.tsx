import { FC, ReactNode, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { DashboardCardSelectModal } from './DashboardCardSelectModal';
import './DashboardCardSelect.styles.css'

interface DashboardCardSelectProps{
    text:string;
    children:ReactNode;
}

export const DashboardCardSelect:FC<DashboardCardSelectProps> = ({text, children}) => {
    const [active, setActive] = useState(false)

  return (
    <>
    <button className='dashboard-card-header' onClick={()=>setActive((prev)=>!prev)}>
        <p>{text}</p>
         {active ? <FiChevronUp size={32}/> :  <FiChevronDown size={32}/>}
    </button>
      <DashboardCardSelectModal onClose={()=>setActive(false)} isOpen={active}>
        <div className='dashboar-card-info'>
             {children}
        </div>
      </DashboardCardSelectModal>
    </>
  )
}
