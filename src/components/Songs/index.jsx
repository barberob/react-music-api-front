import React, { useEffect, useState, useReducer } from 'react'

import { SERVER_URL } from '../../config'

import './songs.scss'

import getInputValue from '../../helpers/getInputValue'

import notificationContext from '../../contexts/notification/notificationContext'
import notificationReducer from '../../contexts/notification/notificationReducer'


import Song from '../Song'
import AddSong from '../AddSong'
import Notification from '../Notification'

const Songs = () => {
    const [songs, setSongs] = useState([])
    const [errorRetrievingSongs, setErrorRetrievingSongs] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetch(`${SERVER_URL}/songs`)
            const songsData = await data.json()
            setSongs(songsData)
        } catch (err) {
            setErrorRetrievingSongs(true)
        }
    }


    const handleDeleteSong = async (_id) => {
        try {
            await fetch(`${SERVER_URL}/songs/delete/${_id}`)
        } catch (err) {
            //TODO display error
            return
        }
        const newSongs = songs.filter(song => song._id !== _id)
        setSongs(newSongs)
    }

    // TODO move values test in other handler
    const handleAddSong = async event => {
        try {
            const values = {
                title: getInputValue(event, 'title'),
                artist: getInputValue(event, 'artist'),
                album: getInputValue(event, 'album'),
                released_at: getInputValue(event, 'released_at'),
            }
            for (const value in values) {
                if (value === '') return
            }

            const response = await fetch(`${SERVER_URL}/songs/add`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            if (data.error) return
            setSongs([...songs, data.song])

        } catch (err) {
            //TODO display error
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

            console.log('result => ', !data.error)
            if (!data.error) {
                const newSongs = songs.map(song => {
                    if (song._id !== values._id) return song
                    else return values
                })
                console.log(newSongs);
                setSongs(newSongs)
                return true
            } else {
                return false
            }
        } catch (err) {
            //TODO handle error
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
            <AddSong handleAddSong={handleAddSong} />
            {!errorRetrievingSongs ? <ul className="Songs-list">
                {songs.length ? songs.map((song) => {

                    return <Song key={song._id} {...song}
                        handleDeleteSong={handleDeleteSong}
                        handleUpdateSong={handleUpdateSong}>
                    </Song>
                }) :
                    <h2>Aucune musique n'a encore été ajoutée</h2>
                }
            </ul> :
                <p>Erreur de récupération des musiques</p>
            }
        </notificationContext.Provider>
    </>
}

export default Songs;