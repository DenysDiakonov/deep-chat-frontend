import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadHistory } from '../../redux/actions/clientsActions'
import DefaultButton from '../HelperComponents/Buttons/DefaultButton/DefaultButton'
import './MainPage.scss'

const MainPage = ({ history, room_history, loadHistory }) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        loadHistory()
    }, [])

    return (
        <div className='main-page'>
            <div className='main-page-find'>
                <h1>Deep Chat</h1>
                <p>Введіть id кімнати</p>
                <div>
                    <input
                        placeholder='ID комнаты'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <DefaultButton
                        onClick={() => history.push(`/main/chat/${value}`)}
                        disabled={value.length === 0}>
                        Увійти
                    </DefaultButton>
                </div>
            </div>

            {room_history.length > 0 && (
                <div className='main-page-history'>
                    <h2>Історія кімнат</h2>
                    <div className='main-page-history-links'>
                        {room_history.map((item, idx) => (
                            <Link
                                className='main-page-history-link'
                                to={`/main/chat/${item}`}
                                key={idx}>
                                • {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = ({ clients }) => {
    return {
        room_history: clients.room_history,
    }
}

const mapDispatchToProps = {
    loadHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
