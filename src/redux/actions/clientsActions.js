import { CLIENTS } from '../../constants'


export function getNewMessage(message) {
    return {
        type: CLIENTS.GET_NEW_MESSAGE,
        payload: message,
    }
}
