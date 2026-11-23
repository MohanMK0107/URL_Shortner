import { api } from "../services/api"

export const generateUrl = async(url:string, alias:string)=>{
    try {
        const response = await api.post("/api/generate-url",{
            url,
            alias
        });
        return response.data;
    } catch (error) {
        throw error
    }
}