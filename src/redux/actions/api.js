import axios from 'axios'
import * as apiUrl from '../../config'

export const api = {
    default: {
        client: axios.create({
            baseURL: apiUrl.HTTP_BASE_URL,
            responseType: 'json',
        }),
    },
}

export default api
