import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { ILinha } from '../../../../../interfaces/ILinha';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import SelectFilter2 from '../../../../../components/Filters/SelectFilter2';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:ILinha;
  errors?:{id:string; message:string}[]
}

export const Form:FC<FormProps> = ({onChange, data, errors}) => {
  const { user } = useContext(UserContext);
  const [empresa, setEmpresa] = useState<IEmpresa | null>(null);
  const [idArea, setIdArea ] = useState("");

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

  useEffect(() => {
    if (data?.area) {
      setIdArea(data.area.id);
    }
  }, [onChange]);
  
  return (
    <div className='limits_form-inputs-container'>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.name} id='name' placeholder='Digite o nome da linha...' label='Nome'/>
         <Input type='number' errorMessage={errors?.find(e=>e.id === 'number')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.number} id='number' placeholder='Digite o número da linha...' label='Número'/>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.description} id='description' placeholder='Digite a descrição da linha...' label='Descrição'/>
         <SelectFilter2 number={0} column='Área' onFilterChange={(value) => {
          onChange("idArea", value);
          setIdArea(value);
         }}/>
         <SelectFilter2 idArea={idArea} isOpcional={1} number={1} column='Subárea' onFilterChange={(value) => onChange("idSubArea", value)}/>
         {/* <Input type='number' errorMessage={errors?.find(e=>e.id === 'idArea')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.area?.id} id='idArea' placeholder='Escolha a Área...' label='Área'/>
         <Input type='number' errorMessage={errors?.find(e=>e.id === 'idSubArea')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.subArea?.id} id='idSubArea' placeholder='Escolha a SubÁrea...' label='SubÁrea'/> */}
    </div>
  )
}
