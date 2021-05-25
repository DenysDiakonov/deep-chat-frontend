import { APP } from '../../constants'

export function closeErrorSnack() {
    return {
        type: APP.ERROR_SNACK_CLOSE,
    }
}
