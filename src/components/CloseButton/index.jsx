import React from 'react'

import './closeButton.scss'

const CloseButton = ({ handleClick }) => {
    return <div onClick={handleClick} className="CloseButton">
        <div></div>
        <div></div>
    </div>
}

export default CloseButton;