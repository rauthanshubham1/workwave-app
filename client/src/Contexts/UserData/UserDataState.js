import React, { useReducer } from 'react'
import UserDataContext from './UserDataContext';

// Reducer
const initialState = {
    isAuthenticated: false,
    userData: null,
}

const reducer = (state, action) => {
    if (action.type === "LOGIN") {
        state = {
            isAuthenticated: action.payload.isAuthenticated,
            userData: action.payload.userData
        }
        return state;
        // console.log(state);
    } else if (action.type === "LOGOUT") {
        state = {
            isAuthenticated: false,
            userData: null,
        }
        return state;
    }
}

const UserDataState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserDataContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export default UserDataState;