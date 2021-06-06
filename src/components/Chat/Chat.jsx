import React, { Component } from 'react'
import RenderField from '../HelperComponents/RenderField/RenderField'
import { Field, reduxForm, reset, formValueSelector } from 'redux-form'
import DefaultButton from '../HelperComponents/Buttons/DefaultButton/DefaultButton'
import './Chat.scss'
import Messages from './Messages'
import { connect } from 'react-redux'
import { getNewMessage, addToHistory } from '../../redux/actions/clientsActions'
import ReconnectingWebSocket from 'reconnecting-websocket'

import sendIcon from '../../assets/image/send.svg'
import Loader from './../HelperComponents/Loader/Loader'
import { WS_BASE_URL } from '../../config'

class Chat extends Component {
    state = {
        loading: true,
        connected: false,
    }
    rws = new ReconnectingWebSocket(
        `${WS_BASE_URL}?token=${localStorage.token}&room=${this.props.match.params.id}`
    )

    componentDidMount() {
        const {
            getNewMessage,
            addToHistory,
            match: {
                params: { id },
            },
        } = this.props
        const { connected } = this.state

        addToHistory(id)

        this.rws.addEventListener('open', () => {
            console.log('connected')
            if (!connected) {
                this.rws.send(
                    JSON.stringify({
                        action: 'getRecentMessages',
                    })
                )
                this.setState({ connected: true })
            }
        })

        this.rws.addEventListener('message', event => {
            this.setState({ loading: false })
            getNewMessage(JSON.parse(event.data))
        })
    }

    componentWillUnmount() {
        this.rws.close()
    }

    submitForm = data => {
        const { reset } = this.props
        const { text } = data
        this.rws.send(
            JSON.stringify({
                action: 'sendMessage',
                content: text,
                token: localStorage.token,
            })
        )
        reset()
    }

    render() {
        const { loading } = this.state
        const {
            messagesList,
            handleSubmit,
            textValue,
            history,
            username,
            match: {
                params: { id },
            },
        } = this.props
        return (
            <div className='chat_page page_wrapper'>
                <header className='chat_page__header section_header'>
                    <div
                        className='back_link'
                        onClick={() => history.goBack()}
                        aria-label='Вернуться назад'
                    />
                    <h1 className='chat_page__title'>Кімната "{id}"</h1>
                </header>
                {loading ? (
                    <div style={{ marginTop: '220px' }}>
                        <Loader />
                    </div>
                ) : (
                    <Messages
                        messages={messagesList}
                        loading={loading}
                        myUsername={username}
                    />
                )}

                <div className='chat_page__send_wrap'>
                    <form
                        className='chat_page__send'
                        onSubmit={handleSubmit(this.submitForm)}>
                        <Field
                            name='text'
                            type='text'
                            component={RenderField}
                            placeholder='Введіть повідомлення...'
                        />
                        <DefaultButton formAction disabled={!textValue}>
                            <span>Надіслати</span>
                            <img src={sendIcon} alt='Отправить' />
                        </DefaultButton>
                    </form>
                </div>
            </div>
        )
    }
}

const validate = values => {
    const errors = {}

    return errors
}

Chat = reduxForm({
    form: 'ChatForm',
    validate,
})(Chat)

const selector = formValueSelector('ChatForm')

const mapStateToProps = state => {
    return {
        messagesList: state.clients.messages,
        loading: state.clients.loading,
        textValue: selector(state, 'text'),
        username: localStorage.username,
    }
}
const mapDispatchToProps = {
    getNewMessage,
    reset: () => reset('ChatForm'),
    addToHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
