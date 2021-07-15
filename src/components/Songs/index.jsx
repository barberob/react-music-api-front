import React, { useEffect, useState, useReducer } from 'react'

import { SERVER_URL } from '../../config'

import './songs.scss'

import notificationContext from '../../contexts/notification/notificationContext'
import notificationReducer from '../../contexts/notification/notificationReducer'


import Song from '../Song'
import AddSong from '../AddSong'
import Notification from '../Notification'
import SearchBar from '../SearchBar'

const Songs = () => {
    const [songs, setSongs] = useState([])
    const [displayedSongs, setDisplayedSongs] = useState([])
    const [errorRetrievingSongs, setErrorRetrievingSongs] = useState(false)

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetchData()
        }

        return () => mounted = false
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/songs`)
            const songsData = await response.json()
            setSongs(songsData)
            setDisplayedSongs(songsData)
        } catch (err) {
            setErrorRetrievingSongs(true)
        }
    }


    const handleDeleteSong = async (_id) => {
        try {
            const response = await fetch(`${SERVER_URL}/songs/delete/${_id}`)
            const { error } = await response.json()
            const newSongs = songs.filter(song => song._id !== _id)
            setSongs(newSongs)
            setDisplayedSongs(newSongs)
            return !error
        } catch (err) {

            return false
        }
    }

    const handleAddSong = async values => {
        try {
            const response = await fetch(`${SERVER_URL}/songs/add`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            if (data.error) return data
            const newSongs = [...songs, data.song]
            setSongs(newSongs)
            setDisplayedSongs(newSongs)
            return { error: false }
        } catch (err) {
            return { error: true }
        }
    }


    const handleUpdateSong = async (values) => {
        try {
            const response = await fetch(`${SERVER_URL}/songs/update`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()

            if (data.exists) return data

            if (!data.error) {
                const newSongs = songs.map(song => {
                    if (song._id !== values._id) return song
                    else return values
                })
                setSongs(newSongs)
                setDisplayedSongs(newSongs)
                return { error: false }
            } else {
                return { error: true }
            }
        } catch (err) {
            return { error: true }
        }
    }


    // ici on pourrait trier les musiques directement sans faire de requetes
    // mais si on ajoute un système de pagination, cela ne marcherait plus
    const handleSearch = async (value) => {
        try {
            if (value === '') {
                setDisplayedSongs(songs)
                return
            }
            const response = await fetch(`${SERVER_URL}/songs/search/${value}`)
            const data = await response.json()
            if (!data.error) {
                setDisplayedSongs(data)
            }
        } catch (err) {
            return false
        }
    }



    const [state, dispatch] = useReducer(notificationReducer, {
        error: false,
        message: 'Musique modifiée',
        shouldDisplay: false
    })

    return <>
        <notificationContext.Provider value={{ state, dispatch }}>
            <Notification></Notification>
            <SearchBar handleSearch={handleSearch}></SearchBar>
            <AddSong handleAddSong={handleAddSong} />

            {!errorRetrievingSongs ? <ul className="Songs-list">
                {displayedSongs.length ? displayedSongs.map((song) => {

                    return <Song key={song._id} {...song}
                        handleDeleteSong={handleDeleteSong}
                        handleUpdateSong={handleUpdateSong}
                    />
                }) :
                    <h2>Aucune musique trouvée</h2>
                }
            </ul> :
                <p>Erreur de récupération des musiques</p>
            }
        </notificationContext.Provider>
    </>
}

export default Songs;