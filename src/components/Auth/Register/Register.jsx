import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import ErrorIcon from '@material-ui/icons/Error'
import { register } from '../../../redux/actions/authActions'
import RenderField from '../../HelperComponents/RenderField/RenderField'
import DefaultButton from '../../HelperComponents/Buttons/DefaultButton/DefaultButton'
import TooltipMessage from '../../HelperComponents/TooltipMessage/TooltipMessage'
import { Link } from 'react-router-dom'

class Register extends Component {
    componentDidMount() {
        const { history } = this.props
        if (localStorage.token) {
            history.push('/main')
        }
    }

    submitForm = data => {
        const { register, history } = this.props
        return register(data).then(res => {
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
                <h1 className='auth_form__title'>Реєстрація</h1>
                <p className='auth_form__subtitle'>Створіть власний акаунт</p>
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
                        Зареєструватися
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
                <Link to={'/auth/login'}>Вхід у систему</Link>
            </form>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Обязательное поле'
    }
    if (!values.password) {
        errors.password = 'Обязательное поле'
    } else if (values.password.length < 3) {
        errors.password = 'Должно быть 3 или более символов'
    }
    return errors
}

Register = reduxForm({
    form: 'RegisterForm',
    validate,
})(Register)

const mapStateToProps = ({ auth, app }) => {
    return {
        authError: auth.error_auth,
        loading: app.loading,
    }
}
const mapDispatchToProps = {
    register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
