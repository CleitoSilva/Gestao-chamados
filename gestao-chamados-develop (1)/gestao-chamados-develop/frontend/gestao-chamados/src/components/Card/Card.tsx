import { FC, ReactNode } from "react";
import "./Card.css";

interface CardProps{
children:ReactNode;
onClick?:()=>void;
}

export const Card:FC<CardProps> = ({children, onClick}) =>{
    return (
        <div style={{cursor:"pointer"}} onClick={onClick} className="card">
            {children}
        </div>
    );
};