import React, { useState } from 'react'

import './addSong.scss'

import Input from '../Input'

const AddSong = ({ handleAddSong }) => {

    const [isAddingSong, setIsAddingSong] = useState(false)

    const handleClick = () => {
        setIsAddingSong(!isAddingSong)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleAddSong(e)
        setIsAddingSong(false)
    }

    return (
        <div>
            <button className="AddSongButton" onClick={handleClick}>{isAddingSong ? 'Annuler ' : 'Ajouter une musique'}</button>

            {isAddingSong && <form className="AddSongForm" onSubmit={handleSubmit}>

                <Input type="text" label="Titre" placeholder="Rapper's Delight" id="title" name="title" required={true} />
                <Input type="text" label="Artiste" placeholder="The Sugarhill Gang" id="artist" name="artist" required={true} />
                <Input type="text" label="Album" placeholder="Sugarhill Gang" id="album" name="album" required={true} />
                <Input type="date" label="Date de sortie" id="released_at" name="released_at" required={true} />
                <button type="submit">Valider</button>
            </form>}

        </div>
    )
}

export default AddSong