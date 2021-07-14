import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../config'
import './songs.scss'
import Song from '../Song'

const Songs = () => {
    const [songs, setSongs] = useState([])


    const fetchData = async () => {
        const data = await fetch(`${SERVER_URL}/songs`)
        const songsData = await data.json()
        setSongs(songsData)
    }

    const handleDeleteSong = async (_id) => {
        try {
            await fetch(`${SERVER_URL}/songs/delete/${_id}`)
        } catch (e) {
            //TODO display error
            return
        }
        const newSongs = songs.filter(song => song._id !== _id)
        setSongs(newSongs)
    }


    useEffect(() => {
        fetchData()
    }, [])

    return <ul className="Songs-list">
        {songs.length ? songs.map((song) => {

            return <Song key={song._id} {...song} handleDeleteSong={handleDeleteSong}></Song>
        }) :
            <h2>Aucune musique n'a encore été ajoutée</h2>
        }
    </ul>
}

export default Songs;