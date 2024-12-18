import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { ITurno } from '../../../../../interfaces/ITurno';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:ITurno;
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
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.description} id='description' placeholder='Digite a descrição do turno...' label='Descrição'/>
         <Input type='time' errorMessage={errors?.find(e=>e.id === 'startHour')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.startHour} id='startHour' placeholder='Digite a hora...' label='Início'/>
         <Input type='time' errorMessage={errors?.find(e=>e.id === 'endHour')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.endHour} id='endHour' placeholder='Digite a hora...' label='Fim'/>
    </div>
  )
}
