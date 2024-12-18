import { ChangeEvent, FC } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import { IArea } from '../../../../../interfaces/IArea';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:IEmpresa;
  errors?:{id:string; message:string}[]
}

export const Form:FC<FormProps> = ({onChange, data, errors}) => {
  return (
    <div className='limits_form-inputs-container'>
        <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.nomeEmpresa} id='name' placeholder='placeholder...' label='Nome da Empresa'/>
        <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.descricaoEmpresa} id='description' placeholder='placeholder...' label='Descrição da Empresa'/>
    </div>
  )
}
