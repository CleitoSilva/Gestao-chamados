import { FC } from "react";
import "./Error.css";

interface ErrorProps{
    message:string;
}
export const Error:FC<ErrorProps> = ({message}) => {
    return (<span className="error">{message}</span>);
};
