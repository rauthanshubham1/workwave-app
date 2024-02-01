import React, { useContext, useState, useEffect } from 'react'
import Header from '../Header/Header'
import "./Settings.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LoadingBar from 'react-top-loading-bar'

const Settings = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);

    useEffect(() => {
        setProgress(100);
    }, [])

    const handleProfilePic = () => {
        setProgress(70);
        const url = prompt("Please enter profile pic url");
        if (url === "") {
            alert("Please enter a valid url");
        } else { }
        setProgress(100);
    }

    const handleDeleteAccount = () => {
        setProgress(70);
        const confirmation = window.confirm("Do yo want to delete you account");
        if (confirmation === true) {
            console.log("Account deleted");
        }
        setProgress(100);
    }

    return (
        darkMode
            ?
            (
                <div className='parentSettingContainer-darkMode'>
                    <LoadingBar color={"red"} progress={progress}
                        onLoaderFinished={() => setProgress(0)} />
                    <Header darkMode={darkMode} heading={"Settings"} />
                    <div className='settingContainer-darkMode'>
                        <div className="settingContainer-profilePic-darkMode">
                            <img src={state.userData.profilePic} alt="" />
                        </div>
                        <button className="button-1" onClick={handleProfilePic}>Change Profile Picture</button>
                        <button className="button-2323" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div >
            )
            :
            (
                <div className='parentSettingContainer'>
                    <LoadingBar color={"red"} progress={progress}
                        onLoaderFinished={() => setProgress(0)} />
                    <Header darkMode={darkMode} heading={"Settings"} />
                    <div className='settingContainer'>
                        <div className="settingContainer-profilePic">
                            <img src={state.userData.profilePic} alt="" />
                        </div>
                        <button className="button-1" onClick={handleProfilePic}>Change Profile Picture</button>
                        <button className="button-2323" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div >
            )

    )
}

export default Settings;