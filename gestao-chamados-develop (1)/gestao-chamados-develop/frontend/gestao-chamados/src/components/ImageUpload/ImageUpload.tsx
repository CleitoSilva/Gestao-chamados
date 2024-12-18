import { ChangeEvent, FC, HtmlHTMLAttributes, useState } from "react";
import "./ImageUpload.css";
import { CgClose } from "react-icons/cg";

type ImageUploadProps = HtmlHTMLAttributes<HTMLInputElement> & { onClearImage?:()=>void, preview?:string}

export const ImageUpload:FC<ImageUploadProps> = ({ onChange, onClearImage, preview, ...rest}) => {
    const url = preview ?  `${process.env.REACT_APP_API_UPLOAD_URL}/${preview}` : "";
    const [imagePreview, setImagePreview] = useState<string>(url);
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files;
        if (file &&  file.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                setImagePreview(event.target?.result as string);
            };

            reader.readAsDataURL(file[0]);
        }
        
        onChange && onChange(e);
    };

    const handleClearImage = () =>{
        setImagePreview("");
        onClearImage && onClearImage();
    };
    return (
        <div className="input-image-container">
            {
                !imagePreview && (
                    <>
                        <label htmlFor={rest.id}>Selecione a Imagem</label>
                        <input {...rest} onChange={handleChange}  id={rest.id} hidden type="file" />
                    </>
                )
            }
            {imagePreview && (
                <>
                    <button onClick={()=>handleClearImage()} className="reset-button"><CgClose /></button>
                    <img className="image-preview" src={imagePreview} alt="image-preview" />
                </>
            )}
        </div>
    );
};