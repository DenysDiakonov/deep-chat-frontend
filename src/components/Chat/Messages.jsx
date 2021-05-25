import React, { Fragment } from 'react'
import moment from 'moment'
import './Chat.scss'

const Messages = ({ messages, myUsername }) => {
    return (
        <div className='chat_page__messages'>
            {messages &&
                messages.map(({ username, content, timestamp }, i) => {
                    const lastIndex = messages.length - 1
                    const timeNow = moment.unix(timestamp).format('YYYY:MM:DD')
                    let timeNext = timeNow
                    const isToday = moment() === moment.unix(timestamp)
                    if (i + 1 <= lastIndex) {
                        timeNext = moment
                            .unix(messages[i + 1].timestamp)
                            .format('YYYY:MM:DD')
                    }
                    return (
                        <Fragment key={i}>
                            <p
                                className={`message ${
                                    myUsername !== username
                                        ? ''
                                        : 'message--your'
                                }`}>
                                <span className='message__author'>
                                    {username}
                                </span>
                                <p className='message__text'>{content}</p>
                                <span className='message__time'>
                                    {moment.unix(timestamp).format('HH:mm')}
                                    {myUsername === username && (
                                        <span
                                            className='message__status read'
                                            aria-label='Статус сообщения'
                                        />
                                    )}
                                </span>
                            </p>
                            {timeNow !== timeNext || i === lastIndex ? (
                                <div className='time_separator'>
                                    {isToday
                                        ? 'Today'
                                        : moment
                                              .unix(timestamp)
                                              .format('MMMM DD, YYYY')}
                                </div>
                            ) : null}
                        </Fragment>
                    )
                })}
        </div>
    )
}

export default Messages
