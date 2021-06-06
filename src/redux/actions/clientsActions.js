import { CLIENTS } from '../constants'

export function getNewMessage(message) {
    return {
        type: CLIENTS.GET_NEW_MESSAGE,
        payload: message,
    }
}

export function loadHistory() {
    return {
        type: CLIENTS.LOAD_ROOM_HISTORY,
    }
}

export function addToHistory(room_id) {
    return {
        type: CLIENTS.ADD_ROOM_HISTORY,
        payload: room_id
    }
}

export function clearMessages() {
    return {
        type: CLIENTS.CLEAR_MESSAGES,
    }
}
