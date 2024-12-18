import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { ICategoriaTecnica } from '../../../../../interfaces/ICategoriaTecnica';
import { ISubArea } from '../../../../../interfaces/ISubArea';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import SelectFilter2 from '../../../../../components/Filters/SelectFilter2';
import { UseNotification } from '../../../../../hooks/useNotification';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:ISubArea;
  errors?:{id:string; message:string}[]
}

export const Form:FC<FormProps> = ({onChange, data, errors}) => {
  const { user } = useContext(UserContext);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const { notify } = UseNotification();

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
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.name} id='name' placeholder='Digite o nome...' label='Nome'/>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.description} id='description' placeholder='Digite a descrição...' label='Descrição'/>
         <SelectFilter2 number={0} column='Área' onFilterChange={(value) => onChange("idArea", value)}/>
         {/* <Input type='number' errorMessage={errors?.find(e=>e.id === 'idArea')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.area?.id} id='idArea' placeholder='Digite a qual área pertence...' label='Área'/> */}
    </div>
  )
}
