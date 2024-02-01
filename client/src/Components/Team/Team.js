import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header/Header"
import TeamMemberCard from './TeamMemberCard/TeamMemberCard'
import "../Team/Team.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LoadingBar from 'react-top-loading-bar'

const Team = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setProgress(70);
        setTeams(state.userData.teams);
        setProgress(100);
    }, [])

    return (
        darkMode
            ?
            <div className='parentTeamContainer-darkMode'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="Team"></Header>
                <div className='teamContainer-darkMode'>
                    {
                        teams.map((member, index) => {
                            return (
                                <TeamMemberCard key={index} darkMode={darkMode} member={member} />
                            )
                        })
                    }
                </div>
            </div >

            :

            <div className='parentTeamContainer'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
                <Header darkMode={darkMode} heading="Team"></Header>
                <div className='teamContainer-darkMode'>
                    {
                        teams.map((member, index) => {
                            return (
                                <TeamMemberCard key={index} darkMode={darkMode} member={member} />
                            )
                        })
                    }
                </div>
            </div >

    )
}

export default Team