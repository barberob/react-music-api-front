import React, { useState } from 'react'

import { SERVER_URL } from '../../config'
import './deleteSong.scss'

const DeleteSong = ({ _id, handleDeleteSong }) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        alert(_id)
        setIsLoading(true)
        handleDeleteSong(_id)
        setIsLoading(false)
    }

    return <button onClick={handleClick}>{isLoading ? 'Suppression...' : 'Supprimer'}</button>
}

export default DeleteSong;