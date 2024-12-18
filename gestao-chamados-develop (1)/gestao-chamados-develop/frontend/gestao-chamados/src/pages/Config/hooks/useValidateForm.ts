import { AnyObject, ObjectSchema, ValidationError } from "yup";
import { useState } from "react";
import { FormType } from "../../../@types";

export const UseValidateForm = () => {
	const [errors, setErrors] = useState<{id:string, message:string}[]>([]);

	const validateForm = async (scheema:ObjectSchema<AnyObject>, dataToValdate:FormType) =>{
		try {
			await scheema.validate(dataToValdate, {abortEarly:false});
			setErrors([]);

			return true;
		} catch (err) {
			const yupError = err as ValidationError;
			setErrors(yupError.errors as unknown as {id:string, message:string}[]);

			return false;
		}
	};
    
	return {validateForm, errors, setErrors};
};