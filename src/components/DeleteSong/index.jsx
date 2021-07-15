import React, { useState, useContext } from 'react'

import './deleteSong.scss'

import notificationContext from '../../contexts/notification/notificationContext'

const DeleteSong = ({ _id, handleDeleteSong }) => {

    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useContext(notificationContext)

    const handleClick = async () => {
        setIsLoading(true)
        const isDeleted = await handleDeleteSong(_id)

        if (isDeleted) {
            dispatch({ type: 'set_all', error: false, message: 'Musique supprimée' })
        } else {
            dispatch({ type: 'set_all', error: true, message: 'Erreur lors de la suppression' })
            setIsLoading(false)
        }
    }

    return <button onClick={handleClick}>{isLoading ? 'Suppression...' : 'Supprimer'}</button>
}

export default DeleteSong;