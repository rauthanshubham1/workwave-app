import React from 'react'
import "./Header.css"

const Header = ({ heading, darkMode }) => {

    return (
        <div className='header' >
            {
                darkMode
                    ?
                    <span className='heading-darkMode'>{heading}</span>
                    :
                    <span className='heading'>{heading}</span>
            }
        </div>
    )
}

export default Header