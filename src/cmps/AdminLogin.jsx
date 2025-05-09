import playspaceLogoBlue from '../assets/img/playspace-logo-blue.png'
import playspaceLogoNew from '../assets/img/playspace-logo-new.png'
import password from '../assets/img/password.png'
import eye from '../assets/img/eye.png'
import { useRef } from 'react'

export function AdminLogin({ loggedinUser, handleSubmitAdminForm, credentials, handleChange }) {

    const input = useRef()

    function onChangeInputType() {
        // input.type 
        input.current.type = (input.current.type === 'password') ? 'text' : 'password'
    }

    return (
        <section className="admin-login">
            {/* <img className="playspace-logo-blue-admin" src={playspaceLogoBlue} /> */}
            <img className="playspace-logo-new" src={playspaceLogoNew} />

            <form className="admin-login-form" onSubmit={handleSubmitAdminForm}>
                <span>שלום {loggedinUser.name}</span>
                <div className="input-group">
                    <input ref={input} placeholder="סיסמה" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <img className="input-img password" src={password} />
                    <img className="input-img eye" onClick={onChangeInputType} src={eye} />
                </div>

                <button className='regular-btn' type="submit" disabled={!credentials.password} >כניסה למנהל</button>
            </form>
        </section>
    )
}