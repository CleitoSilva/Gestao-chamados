import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { ILinha } from '../../../../../interfaces/ILinha';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import { IMaquina } from '../../../../../interfaces/IMaquina';
import SelectFilter2 from '../../../../../components/Filters/SelectFilter2';

interface FormProps {
  onChange: (key: string, value: string | number) => void;
  data?: IMaquina;
  errors?: { id: string; message: string }[]
}

export const Form: FC<FormProps> = ({ onChange, data, errors }) => {
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
      <Input type='text' errorMessage={errors?.find(e => e.id === 'name')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.name} id='name' placeholder='Digite o nome da máquina...' label='Nome' />
      <Input type='text' errorMessage={errors?.find(e => e.id === 'description')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.description} id='description' placeholder='Digite a descrição da máquina...' label='Descrição' />
      <Input type='number' errorMessage={errors?.find(e => e.id === 'order')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.order} id='order' placeholder='Digite o número da ordem...' label='Ordem' />
      <SelectFilter2 number={2} column='Linha' onFilterChange={(value) => onChange("idLine", value)}/>
    </div>
  )
}
