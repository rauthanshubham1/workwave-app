import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import "./MainPage.css"
import Navbar from '../../Components/Navbar/Navbar';
import UserDataContext from '../../Contexts/UserData/UserDataContext';
import jscookie from "js-cookie"
import axios from 'axios';

const MainPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(UserDataContext);
    const [dataLoaded, setDataLoaded] = useState(false);

    const getUserData = async (sessionToken) => {
        try {
            const isEmployee = localStorage.getItem("isEmployee");
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/getUserData?isEmployee=${isEmployee}&sessionToken=${sessionToken}`, { withCredentials: true });
            if (response.status === 200) {
                dispatch({ type: "LOGIN", payload: { userData: response.data, isAuthenticated: true } })
            }
            setDataLoaded(true);
        } catch (err) {
            dispatch({ type: "LOGOUT" })
            localStorage.removeItem("isEmployee");
            jscookie.remove("sessionToken");
            navigate("/login");
            console.log(err)
        }
    };

    useEffect(() => {
        const sessionToken = jscookie.get("sessionToken");
        if (sessionToken) {
            getUserData(sessionToken);
        } else {
            localStorage.removeItem("isEmployee");
            navigate("/login");
        }
    }, [])

    return (
        dataLoaded
            ?
            <div className='container' >
                <div className='sub-container-1'>
                    <Navbar />
                </div >
                <div className='sub-container-2'>
                    <Outlet>
                    </Outlet>
                </div>
            </div >
            :
            " "
    )
}

export default MainPage;
