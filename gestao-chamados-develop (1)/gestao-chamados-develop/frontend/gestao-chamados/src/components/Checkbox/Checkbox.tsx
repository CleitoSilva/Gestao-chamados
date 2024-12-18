import { FC, HtmlHTMLAttributes } from "react"
import './Checkbox.styles.css'

interface CheckboxProps extends HtmlHTMLAttributes<HTMLInputElement>{
    label:string;
    checked?:boolean;
}

export const Checkbox:FC<CheckboxProps> = ({label,checked, ...rest}) => {
  return (
    <div className="checkbox-component-container">
        <label htmlFor={rest.id}>{label}</label>
        <input {...rest} checked={checked} id={rest.id} type="checkbox" />
    </div>
  )
}
