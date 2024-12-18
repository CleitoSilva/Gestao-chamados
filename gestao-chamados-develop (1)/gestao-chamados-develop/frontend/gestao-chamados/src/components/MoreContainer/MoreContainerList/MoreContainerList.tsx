import { FC, ReactNode } from "react";
import "./MoreContainerList.css";

interface TabCrudsMobile {
	onSelectItem?:(tab:{active:boolean, label:string})=>void;
	items:{active:boolean, label:string}[]
	icon:ReactNode;
}

export const MoreContainerListItems:FC<TabCrudsMobile> = ({items, icon, onSelectItem}) => {
	
    return (
        <div className="header-mobile-items">
            {items.map((e, index)=>{
                if(!e.active){
                    return	(
                        <button 
                            key={index}
                            className={"mobile-select-more-item"}  
                            onClick={() => onSelectItem && onSelectItem(e)}>
                            {e.label} 
                            <div>{icon}</div>
                        </button>
                    );
                }})}
        </div>
    );
};
