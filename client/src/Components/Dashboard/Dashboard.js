import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header/Header"
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from '../../Contexts/UserData/UserDataContext'
import LineGraph from "./LineGraph/LineGraph"
import BarGraph from './BarGraph/BarGraph'
import PieGraph from './PieGraph/PieGraph'
import RadarGraph from './RadarGraph/RadarGraph'
import "./Dashboard.css"
import LoadingBar from 'react-top-loading-bar'

const Dashboard = () => {
    const [progress, setProgress] = useState(0);
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        setIsPremium(state.userData.isPremium);
        setProgress(100);
    }, [])


    return (
        darkMode
            ?
            <div className='parentDashboardContainer-darkMode'>
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
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
                <LoadingBar color={"red"} progress={progress}
                    onLoaderFinished={() => setProgress(0)} />
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




