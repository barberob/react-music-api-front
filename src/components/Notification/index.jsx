import React, { useContext, useEffect } from 'react'

import './notification.scss'

import notificationContext from '../../contexts/notification/notificationContext'


const Notification = () => {

    const { state, dispatch } = useContext(notificationContext)
    const { shouldDisplay, error, message } = state


    useEffect(() => {
        if (shouldDisplay === true) {
            setTimeout(() => {
                dispatch({ type: 'set_display', value: false })
            }, 3000)
        }
    }, [shouldDisplay])

    return <>
        <div className={`Notification ${error ? 'error' : 'success'} ${shouldDisplay && 'visible'}`}>
            <p>{message}</p>
        </div>
    </>
}

export default Notification;