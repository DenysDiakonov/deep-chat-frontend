import { CLIENTS } from '../constants'

const INITIAL_STATE = {
    messages: [],
    loading: true,
    room_history: [],
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLIENTS.GET_NEW_MESSAGE:
            return {
                ...state,
                messages: [...action.payload.messages, ...state.messages],
                loading: false,
            }
        case CLIENTS.LOAD_ROOM_HISTORY:
            return {
                ...state,
                room_history: localStorage.history
                    ? JSON.parse(localStorage.history)
                    : [],
            }
        case CLIENTS.CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
                loading: true,
            }
        case CLIENTS.ADD_ROOM_HISTORY:
            const room_history = localStorage.history
                ? JSON.parse(localStorage.history)
                : []
            if (!room_history.includes(action.payload)) {
                const new_room_history = [
                    action.payload,
                    ...room_history.slice(0, 6),
                ]
                localStorage.history = JSON.stringify(new_room_history)
                return {
                    ...state,
                    room_history: new_room_history,
                }
            } else return state
        default:
            return state
    }
}
