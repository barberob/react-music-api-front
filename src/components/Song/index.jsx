import React from 'react'
import './song.scss'

import DeleteSong from './DeleteSong'

const Song = ({ title, artist, album, released_at, _id, handleDeleteSong }) => {
    return <li className="Song-container">
        <h3>{title} - {artist}</h3>
        <h4>Album : {album}</h4>
        <p>Date de sortie: {(new Date(released_at)).toLocaleDateString()}</p>
        <DeleteSong _id={_id} handleDeleteSong={handleDeleteSong} />
    </li>
}

export default Song;