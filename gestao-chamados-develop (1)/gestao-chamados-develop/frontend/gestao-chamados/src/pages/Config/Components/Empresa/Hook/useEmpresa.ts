import { GetAllEmpresas } from './../../../../../service/Empresa/getAllEmpresas';
import { useState } from "react"
import { IEmpresa } from "../../../../../interfaces/IEmpresa"
import { EmpresaService } from "../../../../../service"

export const UseData = (take?:number, offset?:number) => {
    const [data, setData] = useState<IEmpresa[]>()
    const [count, setCount] = useState(0)

    const loadData = async () =>{
        const response:{data:{data:IEmpresa[], count:number}} = await EmpresaService.GetAllEmpresas(take, offset) as {data:{data:IEmpresa[], count:number}}
        const apiResponse = response?.data
        if( apiResponse && apiResponse?.data){
            setData(apiResponse?.data)
        }

        if( apiResponse && apiResponse.count){
            setCount(apiResponse?.count)
        }
    }

    // const onDelete = async(id:string) => await EmpresaService.DeleteLines(id)
    
    
    return {data, loadData, count}
}