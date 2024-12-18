import { InputHTMLAttributes, useState, ReactElement } from "react";

import { HiOutlineEye as SeePasswordIcon, HiOutlineEyeOff as HidePasswordIcon } from "react-icons/hi";

import "./PasswordInput.css";
import TextInput from "../TextInput/TextInput";

interface IPasswordInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: ReactElement;
}

function PasswordInput({ label, className, ...props }: IPasswordInput) {
    const [togglePassword, setTogglePassword] = useState<boolean>(true);

    return (
        <div className="password-input">
            <TextInput 
                label={label} className={className} {...props} 
                icon={
                    <button type="button" className="toggle-password" onClick={() => setTogglePassword(prev => !prev)}>
                        {togglePassword ?
                            <SeePasswordIcon />
                            : 
                            <HidePasswordIcon />
                        }
                    </button>
                }
                type={togglePassword ? "password" : "text" }
            />
        </div>
    );
}

export default PasswordInput;