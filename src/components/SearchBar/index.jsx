import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

import './search.scss'

const SearchBar = ({ handleSearch }) => {

    const [value, setValue] = useState('')

    useEffect(() => {
        console.log(value)
        handleSearch(value)
    }, [value])

    return <input
        className="SearchBar"
        type="text"
        placeholder="chercher une musique, un artiste, ..."
        onChange={debounce(e => setValue(e.target.value.trim()), 250)}
    />
}

export default SearchBar;