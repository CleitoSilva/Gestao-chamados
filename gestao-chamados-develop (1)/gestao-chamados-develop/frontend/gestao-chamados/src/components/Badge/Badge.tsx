
import { FC, useEffect, useState } from "react";
import "./Badge.styles.css";
import { motion } from "framer-motion";

interface BadgeProps {
    text:string;
    variant:"default" | "error" | "active",
	size?:number
}

export const Badge:FC<BadgeProps> = ({text, variant, size}) => {
	const [renderOverlay, setRenderOverlay] = useState(true);

	useEffect(() => {
       
		const interval = renderOverlay ?  setInterval(()=>{
			if(renderOverlay){
				setRenderOverlay(false);
			}
		},10 * 1000) :  null;

		const intervalActive = !renderOverlay ?   setInterval(()=>{
			!renderOverlay && setRenderOverlay(true);
		},1000) : null;

		return ()=>{
			if(interval){
				renderOverlay && clearInterval(interval);
			}

			if(intervalActive){
				!renderOverlay &&  clearInterval(intervalActive);
			}
		}; 
        
	}, [renderOverlay]);
    
	return (
		<div className={"badge-container"} style={{fontSize:size}}>
			{text} 
			<div className={`badge ${variant}`}>
				{renderOverlay && variant !== "default" &&  (
					<motion.div 
						initial={{ width:10, height:10, position:"absolute", borderRadius:"100%"}} 
						animate={{top:-5, left:-5, width:20, height:20, opacity:0}} transition={{duration:0.5}} 
						className='badge-overlay'/>
				)}
			</div>

		</div>
	);
};
