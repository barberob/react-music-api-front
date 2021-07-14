import React, { useState, useContext } from 'react'

import './UpdateSong.scss'

import getInputValue from '../../helpers/getInputValue'

import useClickOutside from '../../hooks/useClickOutside'

import notificationContext from '../../contexts/notification/notificationContext'

import Input from '../Input'
import CloseButton from '../CloseButton'

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

        const isUpdated = await handleUpdateSong(values)
        if (isUpdated) {
            dispatch({ type: 'set_all', error: false, message: 'Musique modifiée', display: true })
            setIsUpdatingSong(false)
        } else {
            dispatch({ type: 'set_all', error: true, message: 'Erreur lors de la modification', display: true })
        }
    }



    const handleClick = () => {
        setIsUpdatingSong(!isUpdatingSong)
    }

    // formats 'released_at' to date input value
    const formatDate = (date) => {
        return (new Date(date)).toLocaleDateString().split('/').reverse().join('-')
    }

    return <div>
        <button onClick={handleClick}>Modifier</button>
        {isUpdatingSong && <form className="UpdateSongForm" onSubmit={handleSubmit} ref={formRef}>
            <CloseButton handleClick={handleClick}></CloseButton>

            <Input type="text"
                label="Titre"
                placeholder="Rapper's Delight"
                id="title"
                name="title"
                value={title}
                required={true}
            />
            <Input type="text"
                label="Artiste"
                placeholder="The Sugarhill Gang"
                id="artist"
                name="artist"
                value={artist}
                required={true}
            />
            <Input type="text"
                label="Album"
                placeholder="Sugarhill Gang"
                id="album"
                name="album"
                value={album}
                required={true}
            />
            <Input type="date"
                label="Date de sortie"
                id="released_at"
                name="released_at"
                value={formatDate(released_at)}
                required={true}
            />
            <input type="submit" value="Valider"></input>
        </form>}

    </div>
}

export default UpdateSong