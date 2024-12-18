import { FC } from "react";
import "./LinkComponent.css";

interface LinkComponentProps{
    url:string;
    label:string;
}

export const LinkComponent:FC<LinkComponentProps> = ({url, label}) => {
 
    return (
        <div className='link-component-container'>
            {/* <iframe src={url} onLoad={handleLoad} onError={handleError} width="100%" height="100%"></iframe> */}
            <a href={url} target='_blank' className='link-tag' rel="noreferrer">
                {label}
            </a>
        </div>
    );
};
