import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header/Header"
import TeamMemberCard from './TeamMemberCard/TeamMemberCard'
import "../Team/Team.css"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'

const Team = () => {

    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setTeams(state.userData.teams);
    }, [])

    return (
        darkMode
            ?
            <div className='parentTeamContainer-darkMode'>
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