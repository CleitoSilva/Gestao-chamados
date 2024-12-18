import { FC, MouseEvent, ReactNode } from "react";
import "./Modal.css";

interface ModalProps{
    children:ReactNode;
    isOpen:boolean;
    onClose:()=>void;
}

export const Modal:FC<ModalProps> = ({children, isOpen, onClose}) => {
	const handleMouseUp = (e:MouseEvent<HTMLDivElement>) =>{
		e.preventDefault();
		const target = e.target as HTMLDivElement;
		if(target.id === "overlay")onClose();
	};

	return isOpen ? (
		<div  className='modal-overlay' id='overlay' onMouseUp={handleMouseUp}>
			{children}
		</div>
	) : null;
};
