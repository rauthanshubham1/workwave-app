import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header/Header"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LineGraph from "./LineGraph/LineGraph"
import BarGraph from './BarGraph/BarGraph'
import PieGraph from './PieGraph/PieGraph'
import RadarGraph from './RadarGraph/RadarGraph'
import "./Dashboard.css"

const Dashboard = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        setIsPremium(state.userData.isPremium);
    }, [])


    return (
        darkMode
            ?
            <div className='parentDashboardContainer-darkMode'>
                <Header darkMode={darkMode} heading="Dashboard" />
                <div className='dashboardContainer'>
                    <div className='dashboardContainer1'>
                        <LineGraph labelColor="white" />
                        <BarGraph labelColor="white" />
                    </div>

                    <div className={isPremium ? 'dashboardContainer2' : 'dashboardContainer2-blur'}>
                        <PieGraph />
                        <RadarGraph labelColor="white" />
                    </div>

                    <div className='notifyContainer-darkMode'>
                        {isPremium ? "" : "Buy premium to unlock more statistics"}
                    </div>

                </div>
            </div >

            :

            <div className='parentDashboardContainer'>
                <Header darkMode={darkMode} heading="Dashboard" />
                <div className='dashboardContainer'>
                    <div className='dashboardContainer1'>
                        <LineGraph labelColor="black" />
                        <BarGraph labelColor="black" />
                    </div>

                    <div className={isPremium ? 'dashboardContainer2' : 'dashboardContainer2-blur'}>
                        <PieGraph />
                        <RadarGraph labelColor="black" />
                    </div>

                    <div className='notifyContainer'>
                        {isPremium ? "" : "Buy premium to unlock more statistics"}
                    </div>

                </div>
            </div>
    )
}

export default Dashboard;




