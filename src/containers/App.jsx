import React from 'react'
import '../style/main.scss'
import { Context as ResponsiveContext } from 'react-responsive'
import { toast } from 'react-toastify'

toast.configure()

const App = props => {
    return (
        <ResponsiveContext.Provider>
            {props.children}
        </ResponsiveContext.Provider>
    )
}

export default App
