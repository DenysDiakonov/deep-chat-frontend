import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import AuthReducer from './reduceAuth'
import AppReducer from './reduceApp'
import ClientsReducer from './reduceClients'
import { reducer as formReducer } from 'redux-form'

const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        form: formReducer,
        auth: AuthReducer,
        app: AppReducer,
        clients: ClientsReducer,
    })

export default rootReducer
