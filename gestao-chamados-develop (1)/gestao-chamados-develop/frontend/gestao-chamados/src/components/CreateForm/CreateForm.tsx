import { ChangeEvent, FC, useState } from "react";
import "./CreateForm.css";
import { Input } from "..";
import { Select } from "../Select/Select";
import { ImageUpload } from "../ImageUpload/ImageUpload";
import { TabTypeEnum } from "../../enums/TabEnum";
import { ITabDTO } from "../../interfaces/ITab";

interface UploadFileFormProps{
    onSubmit:(data:ITabDTO)=>void;
}

export const CreateForm:FC<UploadFileFormProps> = ({onSubmit}) => {
    const [formData, setformData] = useState<ITabDTO>({} as ITabDTO);
    const handleChange = (key:string, value:string | FileList) =>{
        if(key === "file"){
            const fileList = value[0] as File;
            setformData((prev)=>({...prev, file:fileList}));
        }
        setformData((prev)=>({...prev, [key]:value as string}));
    }; 
  
    const selectOptions = [
        {label:"Power Apps", value:TabTypeEnum.POWER_APPS},
        {label:"Link", value:TabTypeEnum.LINK},
        {label:"Power Bi", value:TabTypeEnum.POWER_BI},
        {label:"Excel", value:TabTypeEnum.SPREADSHEET},
        {label:"Imagem", value:TabTypeEnum.IMAGE},
    ];

    return (
        <div className='upload-file-form-container'>
            <div className='upload-modal-upload-container'>
                <Input 
                    placeholder='digite o nome...'  
                    label='Nome'
                    id='name'
                    value={formData?.name} 
                    onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>handleChange(id,value)}/>
                <Select 
                    id='type' 
                    onChange={({target:{id, value}}:ChangeEvent<HTMLSelectElement>)=>handleChange(id, value)}
                    label='tipo de Aba' 
                    items={selectOptions}/>
                {formData.type !== TabTypeEnum.IMAGE ? (
                    <Input  
                        value={formData?.content}
                        label='Url'
                        placeholder='digite a url...' 
                        onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>handleChange(id,value)}/>
                ) :  <ImageUpload onChange={({target:{id, files }}:ChangeEvent<HTMLInputElement>)=>handleChange(id, files as FileList)} id='file'/>}
            </div>
            <div className='submit-button-container'>
                <button onClick={()=>onSubmit(formData)} className='submit-button'>Salvar</button>
            </div>
        </div>
    );
};
