import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MainPage.scss'

class MainPage extends Component {
    state = {
        value: '',
    }
    render() {
        const { value } = this.state
        const { history } = this.props
        return (
            <div className='main-page'>
                <h1>Deep Chat</h1>
                <div className='main-page-find'>
                    <p>Введите id комнаты</p>
                    <div>
                        <input
                            placeholder='ID комнаты'
                            value={value}
                            onChange={e =>
                                this.setState({ value: e.target.value })
                            }
                        />
                        <button
                            onClick={() => history.push(`/main/chat/${value}`)}>
                            Зайти
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({}) => {
    return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
