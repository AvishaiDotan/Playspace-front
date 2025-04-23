import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { login, adminLogin, getUser } from "../store/actions/auth.action"
import { authService } from '../services/auth.service'
import { LoginSignup } from '../cmps/LoginSignup'
import { AdminLogin } from '../cmps/AdminLogin'

export function Login() {

    const [credentials, setCredentials] = useState(authService.getEmptyCredentials())

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        getUserFromBack()
    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    // get user from back 
    async function getUserFromBack() {
        try {
            const user = await getUser()
            console.log('user:', user)
            if (!user.isAdmin) navigate('/user')
            else navigate('/admin')

        } catch (error) {
            // console.error('Error:', error);
        }
    }
    // user login
    async function handleSubmitLoginForm(ev) {
        ev?.preventDefault();
        try {
            const user = await login({ name: credentials.name, email: credentials.email })
            if (!user.isAdmin) navigate('/user')

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // admin login
    async function handleSubmitAdminForm(ev) {
        ev.preventDefault();
        try {
            const userAdmin = await adminLogin(credentials)
            navigate('/admin')
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (<section className="login">

        {!loggedinUser &&
            <LoginSignup credentials={credentials} handleChange={handleChange} onBtnClick={handleSubmitLoginForm} text="התחברות" />
        }
        {loggedinUser?.isAdmin &&
            <AdminLogin loggedinUser={loggedinUser} handleSubmitAdminForm={handleSubmitAdminForm} credentials={credentials} handleChange={handleChange} />}

    </section>

    )
}