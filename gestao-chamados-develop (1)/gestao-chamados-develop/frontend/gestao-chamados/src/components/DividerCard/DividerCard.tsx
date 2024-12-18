import React from "react"
import { Divider } from "../Divider/Divider";
import './DividerCard.styles.css'

interface DividerCardProps{
label:string;
data:string;
}

export const DividerCard:React.FC<DividerCardProps> = ({data, label}) => {
  return (
    <div className="divider-card-container">
        <div className="label-container">
            <p>{label}</p>
        </div>
        <Divider/>
        <div className="data-container">
            {data}
        </div>
    </div>
  )
}
