import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../../components/Header/Header'
import Chat from '../../components/Chat/Chat'
import NotFound from '../../components/NotFound/NotFound'
import { closeErrorSnack } from '../../redux/actions/appActions'
import MainPage from './../../components/MainPage/MainPage'

class Container extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.errorSnack !== this.props.errorSnack &&
            this.props.errorSnack
        ) {
            this.notifyError()
        }
        if (
            prevProps.successSnack !== this.props.successSnack &&
            this.props.successSnack
        ) {
            this.notifySuccess()
        }
    }

    notifyError = () =>
        toast.error(this.props.errorSnackText, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

    notifySuccess = () =>
        toast.success(this.props.successSnackText, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

    render() {
        const { match } = this.props
        if (!localStorage.token) return <Redirect to='/auth/login' />
        return (
            <Fragment>
                <Header />
                <main className='page'>
                    <Switch>
                        <Route path={match.url} exact component={MainPage} />
                        <Route
                            path={`${match.url}/chat/:id`}
                            component={Chat}
                        />
                        <Route render={() => <NotFound />} />
                    </Switch>
                    <ToastContainer />
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ app }) => {
    return {
        errorSnack: app.errorSnack,
        errorSnackText: app.errorSnackText,
        successSnack: app.successSnack,
        successSnackText: app.successSnackText,
    }
}

const mapDispatchToProps = {
    closeErrorSnack,
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
