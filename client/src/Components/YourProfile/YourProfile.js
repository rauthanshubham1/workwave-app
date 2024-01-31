import React, { useContext } from 'react'
import Header from "../Header/Header"
import ProfileCard from './ProfileCard/ProfileCard'
import "./YourProfile.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'


const YourProfile = () => {
    const { darkMode } = useContext(DarkModeContext);
    return (

        darkMode
            ?
            <div className='parentProfileContainer-darkMode'>
                <Header darkMode={darkMode} heading="Your Profile"></Header>
                <div className='profileContainer-darkMode'>
                    <ProfileCard darkMode={darkMode} />
                </div>
            </div>
            :
            <div className='parentProfileContainer'>
                <Header darkMode={darkMode} heading="Your Profile"></Header>
                <div className='profileContainer'>
                    <ProfileCard darkMode={darkMode} />
                </div>
            </div>

    )
}

export default YourProfile