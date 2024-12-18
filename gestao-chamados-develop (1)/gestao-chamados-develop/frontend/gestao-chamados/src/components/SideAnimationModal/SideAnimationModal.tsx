import { FC, ReactNode } from 'react'
// import { AnimatedContainer } from '..'
import './SideAnimationModal.styles.css'
import { AnimatedContainer } from '..';

interface SideAnimationModalrProps{
    onClose?: ()=>void;
    isOpen?:boolean;
    children:ReactNode;
}

export const SideAnimationModal:FC<SideAnimationModalrProps> = ({onClose, isOpen, children}) => {
  return  (
    <AnimatedContainer initial={{x:1000, y:0, display:"none", visibility:"hidden"}} animate={{x: isOpen ? 0 : 1000 , y: 0, display:"flex", visibility:"visible"}} transition={{duration:0.2}} className='side-popup-container'>
      <div className='side-popup'>
            {children}
      </div>
        <div onClick={onClose}  className='side-modal-overlay'/>
    </AnimatedContainer>
  )
}
