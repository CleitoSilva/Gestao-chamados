import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components'
import './Form.styles.css'
import { EmpresaService } from '../../../../../service';
import { UserContext } from '../../../../../contexts/UserContext';
import { IEmpresa } from '../../../../../interfaces/IEmpresa';
import { IColaborador } from '../../../../../interfaces/IColaborador';
import SelectFilter2 from '../../../../../components/Filters/SelectFilter2';

interface FormProps {
  onChange: (key: string, value: string | number) => void;
  data?: IColaborador;
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
      onChange('idColaboratorCategory', 1); //Temporário até tirar o categoria colaborador
    }
  }, [empresa]);

  return (
    //Resolver bugs do colaborador
    <div className='limits_form-inputs-container'>
      <Input type='text' errorMessage={errors?.find(e => e.id === 'name')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.name} id='name' placeholder='Digite o nome do colaborador...' label='Nome' />
      <Input type='text' errorMessage={errors?.find(e => e.id === 'badgeCardNumber')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.badgeCardNumber} id='badgeCardNumber' placeholder='Digite o Crachá...' label='Crachá' />
      <Input type='text' errorMessage={errors?.find(e => e.id === 'rfidCardNumber')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.rfidCardNumber} id='rfidCardNumber' placeholder='Digite o RFID...' label='RFID' />
      <Input type='text' errorMessage={errors?.find(e => e.id === 'reNumber')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.reNumber} id='reNumber' placeholder='Digite o RE...' label='RE' />
      <div className='select-colaborator'>
        <SelectFilter2 number={4} column='Categoria' onFilterChange={(value) => onChange("idTechniqueCategory", value)} />
        <SelectFilter2 isOpcional={1} number={5} column='Turno' onFilterChange={(value) => onChange("idShift", value)} />
        <SelectFilter2 isOpcional={1} number={2} column='Linha' onFilterChange={(value) => onChange("idLine", value)} />
      </div>
      {/* <Input type='number' errorMessage={errors?.find(e => e.id === 'idTechniqueCategory')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.categoriaTecnincaColaborador?.id} id='idTechniqueCategory' placeholder='Escolha a categoria técnica...' label='Categoria Técnica' />
      <Input type='number' errorMessage={errors?.find(e => e.id === 'idShift')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.turno?.id} id='idShift' placeholder='Escolha o turno...' label='Turno' />
      <Input type='number' errorMessage={errors?.find(e => e.id === 'idLine')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.linha?.id} id='idLine' placeholder='Escolha a linha...' label='Linha' />
      <Input type='number' errorMessage={errors?.find(e => e.id === 'idColaboratorCategory')?.message} onChange={({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => onChange(id, value)} value={data?.categoriaColaborador?.id} id='idColaboratorCategory' placeholder='Escolha a categoria...' label='Categoria' /> */}
    </div>
  )
}
