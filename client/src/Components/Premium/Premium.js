import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import DarkModeContext from '../../Contexts/DarkMode/DarkModeContext'
import UserDataContext from "../../Contexts/UserData/UserDataContext"
import "./Premium.css"
import axios from 'axios'


const Premium = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { state } = useContext(UserDataContext);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        setIsPremium(state.userData.isPremium);
    }, [])


    const handleProceedPayment = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/razorpay-key`);
            const key = res.data.key;

            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/create-order`);
            if (response.status === 200) {
                const order = response.data;

                const options = {
                    key: key,
                    amount: order.amount,
                    currency: "INR",
                    name: "WorkWave Corporation",
                    description: "WorkWave Premium",
                    image: "https://media.istockphoto.com/id/1201523312/nl/vector/w-letter-logo-gevormd-door-twee-parallelle-lijnen-met-ruistextuur.jpg?s=612x612&w=0&k=20&c=7pr5e7MohmgMTcbeacRA-tMYcAw6-l2mldmURgkBggk=",
                    order_id: order.id,
                    callback_url: `${process.env.REACT_APP_BACKEND}/completeOrder/${state.userData.email}`,
                    prefill: {
                        name: state.userData.name,
                        email: state.userData.email,
                        contact: state.userData.phone
                    },
                    notes: {
                        address: "Razorpay Corporate Office"
                    },
                    theme: {
                        color: "#d4c9eb"
                    }
                };
                const razor = new window.Razorpay(options);
                razor.open();

            }
        } catch (err) {
            console.log(err)
        }
    }

    return (

        isPremium
            ?

            (
                ""
            )

            :

            (
                (darkMode
                    ?
                    (
                        <div className='parentBuyPremiumContainer-darkMode'>
                            <Header darkMode={darkMode} heading="Buy Premium"></Header>
                            <div className='buyPremiumContainer-darkMode'>
                                <div className='buyPremiumCardContainer-darkMode'>
                                    <h2 style={{ "color": "#fb1e86", "fontStyle": "italic", "padding": "0px", "margin": "0px" }}>Go premium and enjoy exciting benefits</h2>
                                    <div className='premiumBenefitsContainer-darkMode'>
                                        <ol>
                                            <li>Lifetime access</li>
                                            <li>Increase team (upto 5 members)</li>
                                            <li>Increase tasks (upto 8 tasks)</li>
                                            <li>Unlock more statistics</li>
                                        </ol>
                                    </div>
                                    <button className="button-20" onClick={handleProceedPayment} >Click here to proceed</button>
                                </div>
                            </div>
                        </div >
                    )
                    :
                    (
                        <div className='parentBuyPremiumContainer'>
                            <Header darkMode={darkMode} heading="Buy Premium"></Header >
                            <div className='buyPremiumContainer'>
                                <div className='buyPremiumCardContainer'>
                                    <h2 style={{ "color": "black", "fontStyle": "italic", "padding": "0px", "margin": "0px" }}>Go premium and enjoy exciting benefits</h2>
                                    <div className='premiumBenefitsContainer'>
                                        <ol>
                                            <li>Lifetime access</li>
                                            <li>Increase team (upto 5 members)</li>
                                            <li>Increase tasks (upto 8 tasks)</li>
                                            <li>Unlock more statistics</li>
                                        </ol>
                                    </div>
                                    <button className="button-20" onClick={handleProceedPayment} >Click here to proceed</button>
                                </div>
                            </div>
                        </div >
                    )
                )
            )
    )
}

export default Premium;


