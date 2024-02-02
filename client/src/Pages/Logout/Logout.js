import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import UserDataContext from "../../Contexts/UserData/UserDataContext"
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import jscookie from "js-cookie"

const Logout = () => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0);
    const { dispatch } = useContext(UserDataContext);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/logout`, { withCredentials: true });
            if (response.status === 200) {
                dispatch({ type: "LOGOUT" })
                localStorage.removeItem("isEmployee");
                jscookie.remove('sessionToken');
                navigate("/login");
                console.log("Successfully logged out");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setProgress(70);
        handleLogout();
        setProgress(100);
    }, [])

    return (
        <div>
            <LoadingBar color={"red"} progress={progress}
                onLoaderFinished={() => setProgress(0)} />
        </div>
    )
}

export default Logout