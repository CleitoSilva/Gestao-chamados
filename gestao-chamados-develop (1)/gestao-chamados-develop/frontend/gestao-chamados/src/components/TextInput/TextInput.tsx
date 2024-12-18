import { InputHTMLAttributes, ReactElement } from "react";

import "./TextInput.css";

interface ILogin extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  error?: string;
  icon?: ReactElement;
  className?: string;
}

function TextInput({ label, icon, className, ...props }: ILogin) {
	return (
		<div className={`text-input-container ${className}`}>
			<input className="text-input" placeholder={ props.placeholder ? props.placeholder : "." } {...props} value={props.value}/>
			<label>{label}</label>
			{icon && <span className='input-icon'>{icon}</span>}
		</div>
	);
}

export default TextInput;