import { FC } from 'react';
import './TabSelector.styles.css'

interface TabSelectorProps{
    tabs:string[];
    activeTab:number;
    onClickTab:(tab:number)=>void;
}

export const TabSelector:FC<TabSelectorProps> = ({tabs, activeTab, onClickTab}) => {
  return (
    <div className={'tab-selector-container-cr'}>
        {tabs.map(((tab, index)=>(
            <div 
            onClick={()=>onClickTab(index)}
            key={index}
            className={`tab-item-cr ${activeTab === index ? 'active' : ""} ${activeTab < index ? 'no-reply' : ""}`}>
                {tab}
            </div>
        )))}
    </div>
  )
}
