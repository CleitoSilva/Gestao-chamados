import { FC, HtmlHTMLAttributes } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./Select.styles.css";
import { Error } from "../Error";
import { OptionsType } from "../../@types";
import { AnimatedContainer } from "..";

interface SelectProps extends HtmlHTMLAttributes<HTMLSelectElement>{
    items:OptionsType[]
    label:string;
    value?:string | number;
    errorMessage?:string;
    disabled?:boolean;
    fontSize?:number;
}

export const Select:FC<SelectProps> = ({items, value, label, errorMessage, disabled,fontSize, ...rest}) => {
    return (
        <AnimatedContainer className='select-container-component' style={{position:"relative"}}>
            <label style={{fontSize}} htmlFor={rest.id}>{label}</label>
            <select {...rest} disabled={disabled} value={value} id={rest.id} className='select-input'>
                {items.map((opt, index)=>(<option key={index} value={opt.value}>{opt.label}</option>))}
            </select>
            <div className='select-icon'>
                <BiChevronDown size={24}/>
            </div>
            {errorMessage && (
                <div style={{position:"absolute", bottom:"-16px"}}>
                    <Error message={errorMessage}/>
                </div>
            )}
        </AnimatedContainer>
    );
};
