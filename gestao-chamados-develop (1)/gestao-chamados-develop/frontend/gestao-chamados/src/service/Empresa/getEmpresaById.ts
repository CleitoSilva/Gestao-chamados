import { Api } from "../api"

export const getEmpresaById = async (id:string) =>{
    try {
        const query = (id) ? `${id}` : '/'
        const response = await Api.get(`/enterprises/${query}`)
        return response.data.payload
    } catch (error) {
        return error
    }
}