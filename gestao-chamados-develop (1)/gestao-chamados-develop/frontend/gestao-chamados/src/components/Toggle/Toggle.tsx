import { FC } from "react"
import './Toggle.styles.css'

interface ToggleProps{
active?:boolean;
onClick:()=>void;
}

export const Toggle:FC<ToggleProps> = ({active=true, onClick}) => {
  return (
    <button onClick={onClick} className={`toggle-container  ${active ? "" : "inactive"}`}>
        <div onClick={onClick} className={`toggle-thumb`}></div>
    </button>
  )
}
