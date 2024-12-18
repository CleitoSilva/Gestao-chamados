import { FC, ReactNode } from "react";
import "./CardV2.css";

interface CardPropsV2{
    children:ReactNode;
    label?:string;
    onClick?:()=>void;
}

export const CardV2:FC<CardPropsV2> = ({children, onClick, label}) =>{
    return (
        <div style={{cursor:"pointer"}} onClick={onClick} className="card-v2">
            <div className="icon-container">
                {children}
            </div>
            <p className="label">{label}</p>
        </div>
    );
};