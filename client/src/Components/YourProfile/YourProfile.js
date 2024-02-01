import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header/Header"
import ProfileCard from './ProfileCard/ProfileCard'
import "./YourProfile.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import LoadingBar from 'react-top-loading-bar'

const YourProfile = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        setProgress(100);
    }, [])

    return (
        darkMode
            ?
            <div className='parentProfileContainer-darkMode'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="Your Profile"></Header>
                <div className='profileContainer-darkMode'>
                    <ProfileCard darkMode={darkMode} />
                </div>
            </div>
            :
            <div className='parentProfileContainer'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="Your Profile"></Header>
                <div className='profileContainer'>
                    <ProfileCard darkMode={darkMode} />
                </div>
            </div>

    )
}

export default YourProfile