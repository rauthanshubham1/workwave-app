import React, { useState } from 'react'
import DarkModeContext from './DarkModeContext';
const DarkModeState = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeState;