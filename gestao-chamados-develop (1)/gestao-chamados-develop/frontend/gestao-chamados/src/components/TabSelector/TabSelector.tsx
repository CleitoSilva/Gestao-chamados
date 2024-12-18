import { FC } from 'react';
import './TabSelector.styles.css'

interface TabSelectorProps{
    tabs:string[];
    activeTab:number;
    onClickTab:(tab:number)=>void;
}

export const TabSelector:FC<TabSelectorProps> = ({tabs, activeTab, onClickTab}) => {
  return (
    <div className='tab-selector-container'>
        {tabs.map(((tab, index)=>(
            <div 
            onClick={()=>onClickTab(index)}
            key={index}
            className={`tab-item ${activeTab === index ? 'active' : ""}`}>
                {tab}
            </div>
        )))}
    </div>
  )
}
