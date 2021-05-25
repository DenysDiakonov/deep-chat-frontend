import { AUTH } from "../../constants";

const INITIAL_STATE = {
    token: "",
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH.LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.data.token);
            return {
                ...state,
                token: action.payload.data.token,
            };
        case AUTH.REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.data.token);
            return {
                ...state,
                token: action.payload.data.token,
            };
        default:
            return state;
    }
}
