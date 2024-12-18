import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { ICategoriaTecnica } from '../../../../../interfaces/ICategoriaTecnica';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import SelectFilter2 from '../../../../../components/Filters/SelectFilter2';

interface FormProps{
  onChange:(key:string, value:string | number)=>void;
  data?:ICategoriaTecnica;
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
      onChange('typeCategory', 1); //Temporário até tirar o tipo do categoria técnica
    }
  }, [empresa]);

  return (
    <div className='limits_form-inputs-container'>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'name')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.name} id='name' placeholder='Digite o nome da categoria...' label='Nome'/>
         <Input type='text' errorMessage={errors?.find(e=>e.id === 'description')?.message}  onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.description} id='description' placeholder='Digite a descrição da categoria...' label='Descrição'/>
         <SelectFilter2 number={0} column='Área' onFilterChange={(value) => onChange("idAreaLocationCover", value)}/>
         {/* <Input type='number' errorMessage={errors?.find(e=>e.id === 'typeCategory')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.typeCategory} id='typeCategory' placeholder='Digite o tipo da categoria...' label='Tipo da Categoria Técnica'/> */}
         {/* <Input type='number' errorMessage={errors?.find(e=>e.id === 'idAreaLocationCover')?.message} onChange={({target:{id,value}}:ChangeEvent<HTMLInputElement>)=>onChange(id,value)} value={data?.area?.id} id='idAreaLocationCover' placeholder='Digite o tipo da categoria...' label='Área da Categoria Técnica'/> */}
    </div>
  )
}
