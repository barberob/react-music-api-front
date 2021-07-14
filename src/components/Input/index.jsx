import React, { useState } from 'react'

import './input.scss'

const Input = ({ type, placeholder, label, id, name, required, value }) => {

    const [inputValue, setInputValue] = useState(value ? value : '')

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    return <div className="InputContainer">
        <label htmlFor={id}>{label}:</label>
        <input type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            value={inputValue}
            onInput={handleInput}
            required={required ? required : false}
        />
    </div>
}

export default Input;