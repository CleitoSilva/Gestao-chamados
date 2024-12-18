import React, { FC } from "react";
import { CgClose } from "react-icons/cg";
import { AnimatedContainer } from "../AnimatedContainer";
import { Modal, ModalContainer } from "../Modal";
import "./ConfirmationModal.css";

interface ConfirmationModalProps{
    onCancel:()=>void;
    onConfirm:()=>void;
    isOpen:boolean;
}
export const ConfirmationModal:FC<ConfirmationModalProps> = ({isOpen, onCancel, onConfirm}) => {
    return (
        <AnimatedContainer>
            <Modal onClose={onCancel} isOpen={isOpen}>
                <ModalContainer  className="confirmation-modal">
                    <button onClick={onCancel} className="close-button"><CgClose/></button>
                  
                    <div className="modal-confirmation-body">
                            Deseja realmente excluir?
                    </div>
                    <div className="modal-confirmation-footer">
                        <button className="confirmation-button" onClick={onConfirm}>Confirmar</button>
                        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                    </div>
                    
                </ModalContainer>
            </Modal>
        </AnimatedContainer>
    );
};
