import { Api } from "../api"

export const GetAllEmpresas = async (take?:number, offset?:number ) =>{
    try {
          const query = (take?.toString() && offset?.toString()) ? `?take=${take}&offset=${offset}` : '/'
        const response = await Api.get(`/enterprises/paginate?${query}`)
        return response
    } catch (error) {
        return error
    }
}