import React from 'react'
import "../TeamMemberCard/TeamMemberCard.css"

const TeamMemberCard = ({ darkMode, member }) => {
    // console.log(member);
    return (
        darkMode
            ?
            <div className='teamMemberCardContainer-darkMode'>
                <div className='teamMemberImgDiv-darkMode'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&usqp=CAU" alt="" />
                </div>
                <div className='teamMemberDetailsDiv-darkMode'>
                    <p>{member.name}</p>
                    <p>{member.email}</p>
                    <p>{member.phone}</p>
                </div>
            </div>
            :
            <div className='teamMemberCardContainer'>
                <div className='teamMemberImgDiv'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&usqp=CAU" alt="" />
                </div>
                <div className='teamMemberDetailsDiv'>
                    <p>{member.name}</p>
                    <p>{member.email}</p>
                    <p>{member.phone}</p>
                </div>
            </div>

    )
}

export default TeamMemberCard