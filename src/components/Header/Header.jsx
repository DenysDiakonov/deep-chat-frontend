import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const Header = ({ push }) => {
    const username = localStorage.username
    return (
        <header className='header'>
            <Link to={`/`}>
                <p className='header__logo'>Deep Chat</p>
            </Link>
            <div className='header__user'>
                <span className='header__username'>{username}</span>
                <button
                    className='header__logout good_hover'
                    onClick={() => {
                        localStorage.clear()
                        push('/auth/login')
                    }}>
                    Выйти
                </button>
            </div>
        </header>
    )
}

const mapDispatchToProps = {
    push,
}

export default connect(null, mapDispatchToProps)(Header)
