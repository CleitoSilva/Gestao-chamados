import { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react'
import { Button } from '../Button';
import { AnimatedContainer } from '..';
import { Divider } from '../Divider/Divider';
import './FormModal.styles.css'
import { motion } from 'framer-motion';

interface FormModalProps{
  isOpen:boolean;
  onClose:MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onSubmit?:()=>void;
  children:ReactNode;
  title:string;
}

export const FormModal:FC<FormModalProps> = ({isOpen, onClose, onSubmit, children, title}) => {
  const handleClose = (e:MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if(target.id === 'form-modal-overlay') onClose(e)
  }
  

  return isOpen ?  (
    <AnimatedContainer onMouseDown={handleClose} id='form-modal-overlay'  className='form-modal-overlay' >
        <motion.div 
        initial={{position:"absolute", top:"-10000px"}}
        animate={{position:"relative", top:0}} 
        transition={{duration:0.5, mass:0.3, type:"spring"}} 
        className='form-modal'>
            <div className='form-modal-header'>{title}</div>
            <Divider/>
           {children}
          <div>
            <div className='form-modal-footer'>
              <Button onClick={()=>onSubmit && onSubmit()} style={{padding:10,  width:190, borderRadius:8}}> 
                <p  style={{ fontSize:16, fontWeight:600}}>Salvar</p>
              </Button>
              <Button onClick={onClose} style={{width:190, padding:10, borderRadius:8}} variant='secondary'>
                <p  style={{fontSize:16, fontWeight:600}}>Cancelar</p>
              </Button>
            </div>
          </div>
        </motion.div>
    </AnimatedContainer>
  ) : null
}
