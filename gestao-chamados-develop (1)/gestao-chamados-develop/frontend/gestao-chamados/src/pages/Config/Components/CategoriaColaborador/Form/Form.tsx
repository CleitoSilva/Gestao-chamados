import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import { UserContext } from '../../../../../contexts/UserContext';
import { ICategoriaColaborador } from '../../../../../interfaces/ICategoriaColaborador';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:ICategoriaColaborador;
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
      onChange('typeCategory', 1);
    }
  }, [empresa]);
  
  return (
    <div className='limits_form-inputs-container'>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.name} id='name' placeholder='Digite o nome da categoria do colaborador...' label='Nome'/>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.description} id='description' placeholder='Digite a descrição da categoria do colaborador...' label='Descrição'/>
         {/* <Input type='number' errorMessage={errors?.find(e=>e.id === 'typeCategory')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.typeCategory} id='typeCategory' placeholder='Digite o tipo da categoria do colaborador...' label='Tipo'/> */}
    </div>
  )
}
