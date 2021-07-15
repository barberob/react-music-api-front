import React, { useState, useContext } from 'react'

import './UpdateSong.scss'

import getInputValue from '../../helpers/getInputValue'

import useClickOutside from '../../hooks/useClickOutside'

import notificationContext from '../../contexts/notification/notificationContext'

import CloseButton from '../CloseButton'
import SongFormFields from '../SongFormFields'

const UpdateSong = ({ title, artist, album, released_at, _id, handleUpdateSong }) => {

    const [isUpdatingSong, setIsUpdatingSong] = useState(false)

    const { dispatch } = useContext(notificationContext)

    const formRef = useClickOutside(() => {
        setIsUpdatingSong(false)
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        const values = {
            _id,
            title: getInputValue(event, 'title'),
            artist: getInputValue(event, 'artist'),
            album: getInputValue(event, 'album'),
            released_at: getInputValue(event, 'released_at'),
        }


        for (const value in values) {
            if (value === '') return
            dispatch({ type: 'set_all', error: true, message: 'Tous les champs son requis', display: true })
        }

        const updateStatus = await handleUpdateSong(values)
        if (updateStatus.exists) {
            dispatch({ type: 'set_all', error: true, message: 'Une autre musique est similaire', display: true })
        } else if (updateStatus.error) {
            dispatch({ type: 'set_all', error: true, message: 'Erreur lors de la modification', display: true })
        } else {
            dispatch({ type: 'set_all', error: false, message: 'Musique modifiée', display: true })
            setIsUpdatingSong(false)
        }
    }

    const handleClick = () => {
        setIsUpdatingSong(!isUpdatingSong)
    }


    return <div>
        <button onClick={handleClick}>Modifier</button>
        {isUpdatingSong && <form className="UpdateSongForm" onSubmit={handleSubmit} ref={formRef}>
            <CloseButton handleClick={handleClick}></CloseButton>
            <SongFormFields {...{ released_at, title, artist, album }} />
            <input type="submit" value="Valider"></input>
        </form>}

    </div>
}

export default UpdateSong