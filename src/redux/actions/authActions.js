import { AUTH } from '../constants'

export function postLogin(data) {
    return {
        type: AUTH.LOGIN,
        payload: {
            client: 'default',
            request: {
                url: `login`,
                method: 'post',
                data,
            },
        },
    }
}

export function register(data) {
    return {
        type: AUTH.REGISTER,
        payload: {
            client: 'default',
            request: {
                url: `register`,
                method: 'post',
                data,
            },
        },
    }
}
