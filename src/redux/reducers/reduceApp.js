import { APP } from '../../constants'

const INITIAL_STATE = {
    loading: false,
    buttonLoading: false,
    errorSnack: false,
    errorSnackText: '',
    successSnack: '',
    successSnackText: '',
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP.LOADING:
            return { ...state, loading: action.payload }
        case APP.BUTTON_LOADING:
            return { ...state, buttonLoading: action.payload }
        case APP.ERROR_SNACK_OPEN:
            return {
                ...state,
                errorSnack: true,
                errorSnackText: action.payload,
            }
        case APP.ERROR_SNACK_CLOSE:
            return { ...state, errorSnack: false }
        case APP.SUCCESS_SNACK_OPEN:
            return {
                ...state,
                successSnack: true,
                successSnackText: action.payload,
            }
        case APP.SUCCESS_SNACK_CLOSE:
            return { ...state, successSnack: false }
        default:
            return state
    }
}
