import  { FC, ReactNode, CSSProperties, MouseEventHandler } from "react";
import {MotionProps, motion} from "framer-motion";
export interface AnimatedContainerProps extends MotionProps{
    children:ReactNode;
    style?:CSSProperties;
    className?:string;
    onClick?:()=>void;
    onMouseDown?:MouseEventHandler<HTMLDivElement>;
    onMouseUp?:MouseEventHandler<HTMLDivElement>;
    id?:string;
}

export const AnimatedContainer:FC<AnimatedContainerProps> = ({children, onClick, onMouseDown, onMouseUp, id, ...rest}) => {
    return (
        <motion.div 
   
        id={id}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5}} 
        {...rest}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        >
            {children}
        </motion.div>
    );
};
