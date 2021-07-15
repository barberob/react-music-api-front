import React, { useState, useContext } from 'react'

import './addSong.scss'

import getInputValue from '../../helpers/getInputValue'

import notificationContext from '../../contexts/notification/notificationContext'

import SongFormFields from '../SongFormFields'


const AddSong = ({ handleAddSong }) => {

    const [isAddingSong, setIsAddingSong] = useState(false)

    const { dispatch } = useContext(notificationContext)

    const handleClick = () => {
        setIsAddingSong(!isAddingSong)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const values = {
            title: getInputValue(event, 'title'),
            artist: getInputValue(event, 'artist'),
            album: getInputValue(event, 'album'),
            released_at: getInputValue(event, 'released_at'),
        }
        for (const value in values) {
            if (value === '') {
                dispatch({ type: 'set_all', error: true, message: 'Tous les champs sont requis', display: true })
                return
            }
        }
        const isAdded = await handleAddSong(values)
        if (isAdded) {
            dispatch({ type: 'set_all', error: false, message: 'Musique ajoutée', display: true })
        } else {
            dispatch({ type: 'set_all', error: true, message: 'Erreur lors de l\'ajout', display: true })
        }
        setIsAddingSong(false)
    }

    return (
        <div>
            <button className="AddSongButton" onClick={handleClick}>{isAddingSong ? 'Annuler ' : 'Ajouter une musique'}</button>

            {isAddingSong && <form className="AddSongForm" onSubmit={handleSubmit}>
                <SongFormFields></SongFormFields>
                <button type="submit">Valider</button>
            </form>}

        </div>
    )
}

export default AddSong