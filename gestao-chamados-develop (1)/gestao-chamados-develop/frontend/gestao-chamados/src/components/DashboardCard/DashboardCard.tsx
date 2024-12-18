import { FC, HtmlHTMLAttributes, ReactNode } from 'react'
import './DarshboardCard.styles.css'

interface DashboardCardProps extends HtmlHTMLAttributes<HTMLDivElement>{
    children:ReactNode;
}

export const DashboardCard:FC<DashboardCardProps> = ({children, ...rest}) => {
  return (
    <div {...rest} className='dashboard-card'>
        {children}
    </div>
  )
}
