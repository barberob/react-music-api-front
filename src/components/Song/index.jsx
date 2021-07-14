import React from 'react'
import './song.scss'

import DeleteSong from './DeleteSong'
import UpdateSong from './UpdateSong'

const Song = ({ title, artist, album, released_at, _id, handleDeleteSong, handleUpdateSong }) => {
    return <li className="Song-container">
        <h3>{title} - {artist}</h3>
        <h4>Album : {album}</h4>
        <p>Date de sortie: {(new Date(released_at)).toLocaleDateString()}</p>
        <DeleteSong _id={_id} handleDeleteSong={handleDeleteSong} />
        <UpdateSong {...{ title, artist, album, released_at, _id, handleUpdateSong }} />
    </li>
}

export default Song;