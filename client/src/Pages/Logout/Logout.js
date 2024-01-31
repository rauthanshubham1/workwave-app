import React, { useContext, useEffect } from 'react'
import axios from "axios"
import UserDataContext from "../../Contexts/UserData/UserDataContext"
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(UserDataContext);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/logout`, { withCredentials: true });
            if (response.status === 200) {
                dispatch({ type: "LOGOUT" })
                localStorage.removeItem("isEmployee");
                navigate("/login");
                console.log("Successfully logged out");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        handleLogout();
    }, [])

    return (
        <div></div>
    )
}

export default Logout