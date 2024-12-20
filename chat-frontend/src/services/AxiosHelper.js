import axios from 'axios'
export const baseUrl = "http://localhost:9095"
export const httpClient = axios.create(
    {
        baseURL:baseUrl
    }
)