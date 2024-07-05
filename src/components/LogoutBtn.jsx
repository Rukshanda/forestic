import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/authServices'
import { logout } from '../features/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')  // Redirect to home page after logging out
        })
    }

    return (
        <button
            className='inline-block duration-200 buttonHover text-[1.3rem]'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
