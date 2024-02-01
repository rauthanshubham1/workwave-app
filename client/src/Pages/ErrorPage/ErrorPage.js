import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ErrorPage.css"

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className='errorPage'>
            <img
                id="errorImg"
                src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
                alt=""
            />
            <button onClick={() => { navigate(-1); }} className='button-85'>GO BACK</button>
        </div>
    )
}

export default ErrorPage;