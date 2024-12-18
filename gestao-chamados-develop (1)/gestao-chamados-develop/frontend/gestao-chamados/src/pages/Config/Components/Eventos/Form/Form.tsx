import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { IEventos } from '../../../../../interfaces/IEventos';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:IEventos;
  errors?:{id:string; message:string}[]
}

export const Form:FC<FormProps> = ({onChange, data, errors}) => {
  const { user } = useContext(UserContext);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      if (user?.idEnterprise) {
        const empresaData = await EmpresaService.getEmpresaById(user.idEnterprise);
        setEmpresa(empresaData);
      }
    };

    fetchEmpresa();
  }, [user]);

  useEffect(() => {
    if (empresa && data) {
      onChange('idEnterprise', empresa.id);
    }
  }, [empresa]);
  
  return (
    <div className='limits_form-inputs-container'>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.nomeEvento} id='name' placeholder='Digite o nome da Área...' label='Nome da Área'/>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.codigoEvento} id='description' placeholder='Digite a descrição da Área...' label='Descrição da Área'/>
    </div>
  )
}
