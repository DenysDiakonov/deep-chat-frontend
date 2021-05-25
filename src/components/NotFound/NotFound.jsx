import React from 'react'
import NotFoundIcon from '../../assets/image/404_error.png'
import './NotFound.scss'

const NotFound = ({ text = 'Not Found' }) => {
    return (
        <div className='page_not_found'>
            <img src={NotFoundIcon} alt='not found' />
        </div>
    )
}

export default NotFound
