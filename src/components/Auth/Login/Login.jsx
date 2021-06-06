import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import ErrorIcon from '@material-ui/icons/Error'
import { postLogin } from '../../../redux/actions/authActions'
import RenderField from '../../HelperComponents/RenderField/RenderField'
import DefaultButton from '../../HelperComponents/Buttons/DefaultButton/DefaultButton'
import TooltipMessage from '../../HelperComponents/TooltipMessage/TooltipMessage'
import { Link } from 'react-router-dom'

class Login extends Component {
    componentDidMount() {
        const { history } = this.props
        if (localStorage.token) {
            history.push('/main')
        }
    }

    submitForm = data => {
        const { postLogin, history } = this.props
        return postLogin(data).then(res => {
            if (
                res.payload &&
                res.payload.status &&
                res.payload.status === 200
            ) {
                localStorage.setItem('username', data.username)
                history.push('/main')
            } else {
                throw new SubmissionError({
                    ...res.error.response.data,
                    _error: res.error.response.data.detail,
                })
            }
        })
    }

    render() {
        const {
            handleSubmit,
            submitting,
            pristine,
            valid,
            authError,
            loading,
            error,
        } = this.props

        return (
            <form
                className='auth_form'
                onSubmit={handleSubmit(this.submitForm)}>
                <h1 className='auth_form__title'>Авторизація</h1>
                <p className='auth_form__subtitle'>Увійдіть в свій акаунт</p>
                <Field
                    name='username'
                    type='text'
                    component={RenderField}
                    label='Юзернейм'
                />
                <Field
                    name='password'
                    type='password'
                    component={RenderField}
                    label='Пароль'
                />
                <div className='auth_form__main_error'>{error}</div>
                <div className='auth_form__btn'>
                    <DefaultButton
                        variant='contained'
                        disabled={submitting || pristine || !valid}
                        loading={loading}
                        formAction>
                        Увійти
                    </DefaultButton>
                    {authError ? (
                        <TooltipMessage
                            text={authError}
                            delay={200}
                            error
                            position='right'
                            classes=''>
                            <ErrorIcon />
                        </TooltipMessage>
                    ) : (
                        ''
                    )}
                </div>
                <Link to={'/auth/register'}>Реєстрація</Link>
            </form>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = "Обов'язкове поле"
    }
    if (!values.password) {
        errors.password = "Обов'язкове поле"
    } else if (values.password.length < 3) {
        errors.password = 'Має бути 3 або більше символів'
    }
    return errors
}

Login = reduxForm({
    form: 'LoginForm',
    validate,
})(Login)

const mapStateToProps = ({ auth, app }) => {
    return {
        authError: auth.error_auth,
        loading: app.loading,
    }
}
const mapDispatchToProps = {
    postLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
