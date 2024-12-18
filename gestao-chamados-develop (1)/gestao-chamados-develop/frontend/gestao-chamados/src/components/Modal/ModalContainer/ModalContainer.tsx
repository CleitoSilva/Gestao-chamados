import { FC, ReactNode } from "react";
import { AnimatedContainer } from "../../AnimatedContainer/AnimatedContainer";
import "./ModalContainer.css";

interface ModalContainerProps{
    children:ReactNode;
    className?:string;
}
export const ModalContainer:FC<ModalContainerProps> = ({children, className}) => {
    return (
        <AnimatedContainer className={`modal-container ${className}`}>
            {children}
        </AnimatedContainer>
    );
};
