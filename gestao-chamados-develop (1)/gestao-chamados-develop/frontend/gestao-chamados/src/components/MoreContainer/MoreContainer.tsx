import {CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";
import { TfiMoreAlt as MoreIcon } from "react-icons/tfi";
import {motion} from "framer-motion";
import "./MoreContainer.css";

interface MoreContainerMobilProps {
    onClickItem?:(id:string | number)=>void;
    style?:CSSProperties;
    children:ReactNode;
    icon?:ReactNode;
}

export const MoreContainer:FC<MoreContainerMobilProps> = ({style, children, icon}) => {
    const [renderModal, setRenderModal] = useState(false);

    useEffect(() => {
        if(ref.current){
            ref.current.style.right = "0px";
            ref.current.style.top = "40px";
        }
    }, [renderModal]);
    
    const ref= useRef<HTMLDivElement>(null);
    return (
        <div className="action-container-more" style={{position:"relative"}}>
            {renderModal && (<div  className="mobile-more-overlay" onClick={()=>setRenderModal(false)} />)}
            <button style={{...style}} className="more-container-button" onClick={()=>setRenderModal((prev)=>(!prev))}>
                {icon || <MoreIcon size={16}/>}
            </button>
            {renderModal && (
                <motion.div 
                    onClick={()=>setRenderModal(false)} 
                    initial={{opacity:0}} 
                    animate={{opacity:1}} 
                    exit={{opacity:0}}  
                    ref={ref} 
                    className="mobile-select-more">
                    {children}
                </motion.div>
            )}
        </div>
    );
};
