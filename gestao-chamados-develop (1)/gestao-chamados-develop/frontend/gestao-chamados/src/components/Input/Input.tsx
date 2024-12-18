import { FC, HtmlHTMLAttributes } from "react";
import { Error } from "../Error";
import TimePicker from 'react-time-picker';
import "./Input.css";

interface InputProps extends HtmlHTMLAttributes<HTMLInputElement> {
    label: string;
    value?: string | number;
    placeholder?: string;
    errorMessage?: string;
    type?: "text" | "number" | "time"
    maxLength?: number;
    max?: number;
}




export const Input: FC<InputProps> = ({ label, value, placeholder, errorMessage, type, max, ...rest }) => {
    return (
        <div className='input-container' style={{ position: "relative" }}>
            <label htmlFor="">{label}</label>
            {type === "time" ? 
            // <TimePicker format="HH:mm"/>
            <input {...rest} type={type} placeholder={placeholder} value={value} max={max} />
            :
            <input {...rest} type={type} placeholder={placeholder} value={value} max={max} />
            }
            {errorMessage && (
                <div style={{ position: "absolute", bottom: "-16px" }}>
                    <Error message={errorMessage} />
                </div>
            )}
        </div>
    );
};
