import React, { useContext, useEffect } from 'react'
import "./ProfileCard.css"
import UserDataContext from '../../../Contexts/UserData/UserDataContext'

const ProfileCard = ({ darkMode }) => {
    const { state } = useContext(UserDataContext);
    // console.log(state);

    return (
        darkMode
            ?
            <div className='profileCardContainer-darkMode'>
                <div className='profileImgDiv-darkMode'>
                    <img src={state.userData.profilePic} alt="" />
                </div>
                <div className='detailsDiv-darkMode'>
                    <p>{state.userData.name}</p>
                    <p>{state.userData.phone}</p>
                    <p>{state.userData.email}</p>
                </div>
            </div>
            :
            <div className='profileCardContainer'>
                <div className='profileImgDiv'>
                    <img src={state.userData.profilePic} alt="" />
                </div>
                <div className='detailsDiv'>
                    <p>{state.userData.name}</p>
                    <p>{state.userData.phone}</p>
                    <p>{state.userData.email}</p>
                </div>
            </div>

    )
}

export default ProfileCard