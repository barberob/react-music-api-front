import React, { useState } from 'react'

import './deleteSong.scss'

const DeleteSong = ({ _id, handleDeleteSong }) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        handleDeleteSong(_id)
        setIsLoading(false)
    }

    return <button onClick={handleClick}>{isLoading ? 'Suppression...' : 'Supprimer'}</button>
}

export default DeleteSong;