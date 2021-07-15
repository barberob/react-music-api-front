import React from 'react'
import Input from '../Input';


const SongFormFields = ({ title, artist, album, released_at }) => {

    // formats 'released_at' to date input value
    const formatDate = (date) => {
        return (new Date(date)).toLocaleDateString().split('/').reverse().join('-')
    }

    return <>
        <Input type="text"
            label="Titre"
            placeholder="Rapper's Delight"
            id="title"
            name="title"
            value={title || ''}
            required={true}
        />
        <Input type="text"
            label="Artiste"
            placeholder="The Sugarhill Gang"
            id="artist"
            name="artist"
            value={artist || ''}
            required={true}
        />
        <Input type="text"
            label="Album"
            placeholder="Sugarhill Gang"
            id="album"
            name="album"
            value={album || ''}
            required={true}
        />
        <Input type="date"
            label="Date de sortie"
            id="released_at"
            name="released_at"
            value={formatDate(released_at) || ''}
            required={true}
        />
    </>
}

export default SongFormFields;