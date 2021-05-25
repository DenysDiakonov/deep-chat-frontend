import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from '../../components/Auth/Login/Login'
import NotFound from '../../components/NotFound/NotFound'
import Register from '../../components/Auth/Register/Register'

import { closeErrorSnack } from '../../redux/actions/appActions'
import './AuthContainer.scss'

class AuthContainer extends Component {
    render() {
        const { match } = this.props
        if (!!localStorage.token) return <Redirect to='/main' />
        return (
            <Fragment>
                <main className='auth'>
                    <h1 className='auth__logo'>Deep Chat</h1>
                    <div className='auth__container'>
                        <Switch>
                            <Route
                                path={`${match.url}/login`}
                                exact
                                component={Login}
                            />
                            <Route
                                path={`${match.url}/register`}
                                exact
                                component={Register}
                            />
                            <Route render={() => <NotFound />} />
                        </Switch>
                    </div>
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ app }) => {
    return {
        errorSnack: app.errorSnack,
        errorSnackText: app.errorSnackText,
    }
}

const mapDispatchToProps = {
    closeErrorSnack,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
