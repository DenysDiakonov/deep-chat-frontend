import { CLIENTS } from '../../constants'

const INITIAL_STATE = {
    messages: [],
    loading: true
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLIENTS.GET_NEW_MESSAGE:
            return {
                ...state,
                messages: [
                    ...action.payload.messages,
                    ...state.messages
                ],
                loading: false,
            }
        default:
            return state
    }
}
