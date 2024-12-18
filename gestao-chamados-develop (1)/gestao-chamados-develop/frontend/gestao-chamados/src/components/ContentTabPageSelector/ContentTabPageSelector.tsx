import { ITab } from "../../interfaces/ITab";
import { FC } from "react";
// import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { TabTypeEnum } from "../../enums/TabEnum";
import "./ContentTabPageSelector.css";

interface ContentTabPageSelectorProps{
    tabDataToRender:ITab;
}

export const ContentTabPageSelector:FC<ContentTabPageSelectorProps> = ({tabDataToRender}) => {
    return (
        <div className='content-tab-page-selector-page'>
            {tabDataToRender && (tabDataToRender?.content  || tabDataToRender.file?.path )  && 
    <div className='content-tab-page-selector-page-content'>
        {  tabDataToRender?.type === TabTypeEnum.POWER_BI && (
            <iframe 
                title={tabDataToRender?.name} 
                width="100%" 
                height="100%" 
                src={tabDataToRender?.content as string}></iframe>
        )
        }
        {tabDataToRender?.type === TabTypeEnum.POWER_APPS && (
            <iframe 
                title={tabDataToRender?.name}
                allowFullScreen
                width="100%" 
                height="100%" 
                src={tabDataToRender?.content as string}>
            </iframe> 
        )
        }
        {tabDataToRender?.type === TabTypeEnum.SPREADSHEET && (
            <div className='spreadsheet-container'>
          return <iframe 
                    width="100%" 
                    height="100%" 
                    src={tabDataToRender?.content as string}>         
                </iframe>
            </div>
        )
        }
        {tabDataToRender?.type === TabTypeEnum.IMAGE && (
            <div className='image-container'>
                <img src={`${process.env.REACT_APP_API_UPLOAD_URL}/${tabDataToRender.file?.path}`} alt="content image" />
            </div>
        )
        }
        {tabDataToRender.type === TabTypeEnum.LINK && tabDataToRender.content !== null && (
            <div className='link-container'>
                <p className='message-text'>Não foi Possivel exibir essa Página!</p>
                <LinkComponent label={"Clique para acessar!"} url={tabDataToRender.content as string}/>
            </div>
        ) 
        }
    </div>
            }
            {!tabDataToRender || (  !tabDataToRender?.content && !tabDataToRender?.file?.path )  &&        
            <div className='content-tab-page-selector-page-content'>
                <div className='empty-content-container'>
                    <p className='message-text'>
                Não há conteúdo para ser exibido
                    </p>
                </div>
            </div>
            }
        </div>
    );
};
