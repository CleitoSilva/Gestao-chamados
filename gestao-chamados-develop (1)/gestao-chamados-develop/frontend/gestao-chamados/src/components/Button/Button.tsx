import { FC, HtmlHTMLAttributes, ReactNode } from "react"
import './Button.styles.css'
interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement>{
    variant?:"primary" | "secondary" | "tertiary";
    theme?:"default" | "error" | "warning"
    children:ReactNode;
}
export const Button:FC<ButtonProps> = ({variant='primary', children, theme="default", ...rest}) => {
  return (
    <button {...rest} className={`button ${variant} ${theme}`}>
        {children}
    </button>
  )
}
