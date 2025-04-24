import { useState, useEffect, useContext, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { utilService } from '../services/util.service'
import { signup, getPlayer, getUser, getPlayerByCookie, isUserExist } from "../store/actions/auth.action"
import { getShallowGameById } from "../store/actions/game.action"
import { Carousel } from '../cmps/Carousel'
import { UserImgAddModal } from "../cmps/UserImgAddModal"

import avatar1 from '../assets/img/avatar_1.png'
import avatar2 from '../assets/img/avatar_2.png'
import avatar3 from '../assets/img/avatar_3.png'
import avatar4 from '../assets/img/avatar_4.png'
import avatar5 from '../assets/img/avatar_5.png'
import avatar6 from '../assets/img/avatar_6.png'
import avatar7 from '../assets/img/avatar_7.png'
import avatar8 from '../assets/img/avatar_8.png'
import avatar9 from '../assets/img/avatar9.png'
import avatar10 from '../assets/img/avatar10.png'
import avatar11 from '../assets/img/avatar11.png'
import avatar12 from '../assets/img/avatar12.png'
import avatar13 from '../assets/img/avatar13.png'
import avatar14 from '../assets/img/avatar14.png'
import avatar15 from '../assets/img/avatar15.png'
import avatar16 from '../assets/img/avatar16.png'
import avatar17 from '../assets/img/avatar17.jpg'
import avatar18 from '../assets/img/avatar18.jpg'
import avatar19 from '../assets/img/avatar19.jpg'
import avatar20 from '../assets/img/avatar20.jpg'
import avatar21 from '../assets/img/avatar21.jpg'
import avatar22 from '../assets/img/avatar22.jpg'
import avatar23 from '../assets/img/avatar23.jpg'
import avatar24 from '../assets/img/avatar24.jpg'
import v from '../assets/img/green-v.png'
import eye from '../assets/img/eye.png'
import plus from '../assets/img/plus.png'
import { LoginSignup } from "../cmps/LoginSignup.jsx"


import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'
import { showUserMsg } from "../services/event-bus.service.js"

// work : http://localhost:5173/signup/80c6face-668b-4d14-82e8-08dc98ddb702
// lifeSaver:
// work : http://localhost:5173/signup/2e1586e7-112a-4a57-3a40-08dc98f4555f
// work : http://localhost:5173/signup/6538762c-c0e7-4fcc-3a41-08dc98f4555f
// icon
// work : http://localhost:5173/signup/cd8b9f9d-cf81-4a4b-8761-08dc9b505fc1

export function Signup() {
    // const [credentials, setCredentials] = useState(utilService.loadFromStorage('credentials') || authService.getEmptySignupCred())
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())
    const [shallowGame, setShallowGame] = useState(null)

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)
    const [stepIdx, setStepIdx] = useState(utilService.loadFromStorage('signupStepIdx') || 0)
    const [isLoading, setIsLoading] = useState(false)

    const avatars1 = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]
    const avatars2 = [avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16]
    const avatars3 = [avatar17, avatar18, avatar19, avatar20, avatar21, avatar22, avatar23, avatar24]

    const [openUserImgAddModal, onToggleOpenUserImgAddModal] = useToggle(false)
    const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)
    useEffectToggleModal(onOpenScreen, onCloseScreen, [openUserImgAddModal])
    useEffectCloseModal(isScreenOpen, [onToggleOpenUserImgAddModal])

    const { gameId } = useParams()
    const navigate = useNavigate()
    const colors = useRef(null);

    useEffect(() => {
        setCredentials(prev => ({ ...prev, gameId }))
        getShallowGame()
    }, [])

    useEffect(() => {
        if (loggedinPlayer && shallowGame) {
            navigate(`/game/${shallowGame.id}`)
            return
        }
    }, [loggedinPlayer])

    useEffect(() => {
        utilService.saveToStorage('signupStepIdx', stepIdx)
    }, [stepIdx])

    useEffect(() => {
        utilService.saveToStorage('credentials', credentials)
    }, [credentials])

    useEffect(() => {
        changeColorsVars()
    }, [shallowGame])

    async function getUserFromBack() {
        try {
            const user = await getUser() // user
            console.log('user:', user)

            const player = await getPlayerByCookie(gameId) // player
            console.log('player:', player)

        } catch (error) {
            // console.error('Error:', error);
        }
    }

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function getShallowGame() {
        const shallowGame = await getShallowGameById(gameId)
        console.log('shallowGame:', shallowGame)
        setShallowGame(shallowGame)

        // colors.current = shallowGame.groups.map(g => utilService.getRandomColor())
    }

    function changeColorsVars() {
        if (!shallowGame || !shallowGame.themeColors) return
        const elRoot = document.querySelector(':root')
        // shallowGame?.themeColors.forEach((color, i) => {
        //     elRoot.style.setProperty(`--clr-${i}`, color);
        // })

        // elRoot.style.setProperty(`--primary`, shallowGame?.themeColors[0]);
        // elRoot.style.setProperty(`--primary-35`, shallowGame?.themeColors[1]);
        // elRoot.style.setProperty(`--gradient-clr-1`, shallowGame?.themeColors[2]);
        // elRoot.style.setProperty(`--gradient-clr-2`, shallowGame?.themeColors[0]);
    }

    async function onChangeFileInput(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev, gameId)
            setCredentials(prev => ({ ...prev, media }))
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        try {
            const user = await signup(credentials)
            const player = await getPlayer(gameId)

            resetSignup()
            if (player) navigate(`/game/${shallowGame.id}`)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    function resetSignup() {
        utilService.saveToStorage('signupStepIdx', 0)
        utilService.saveToStorage('credentials', authService.getEmptySignupCred())
    }

    function onCloseModal() {
        onToggleOpenUserImgAddModal()
        setStepIdx(prev => prev + 1)
    }

    async function onSignUpNameEmail() {
        try {
            const { email, name } = credentials
            const miniCredentials = {
                email,
                name,
                gameId: shallowGame.id,
            }
            const res = await isUserExist(miniCredentials)
            if (!res) setStepIdx(prev => prev + 1)
            else showUserMsg('שם או מייל קיים כבר במערכת')

        } catch (error) {
            console.error('Error:', error);
        }

    }

    // if (isLoading) return
    return (
        <section className="signup">

            {stepIdx === 0 &&
                <LoginSignup credentials={credentials} handleChange={handleChange} onBtnClick={onSignUpNameEmail} text="הרשמה" useEffectFunc={getUserFromBack} companyIcon={shallowGame?.icon} />
            }
            {/* {stepIdx === 0 && !loggedinPlayer &&
                <LoginSignup credentials={credentials} handleChange={handleChange} onBtnClick={() => setStepIdx(prev => prev + 1)} btnType="button" text="Sign up" />
            } */}

            {stepIdx === 1 &&
                <section className="step-1">
                    <div className="header">
                        <span className="select">Select your avatar</span>
                        <img className="plus" onClick={onToggleOpenUserImgAddModal} src={plus} />
                        {openUserImgAddModal && <UserImgAddModal isLoading={isLoading} media={credentials.media} onChangeFileInput={onChangeFileInput} onCloseModal={onCloseModal} />}
                    </div>

                    <div className="avatar-container">
                        <div className="carousel-container">
                            <span> Classic</span>
                            <Carousel items={avatars1} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>
                        <div className="carousel-container">
                            <span>Toon</span>
                            <Carousel items={avatars2} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>
                        <div className="carousel-container">
                            <span>Animal</span>
                            <Carousel items={avatars3} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>

                        <button disabled={!(credentials.media?.url)} onClick={() => setStepIdx(prev => prev + 1)}>Next</button>
                    </div>
                </section>}

            {stepIdx === 2 && shallowGame &&
                <section className="step-2">
                    {shallowGame.groups && <>
                        <div className="header">
                            <span>Choose a group</span>
                        </div>
                        <ul className="groups-container">
                            {shallowGame.groups?.map((group, i) =>
                                <li key={group.id}
                                    className={credentials.groupId === group.id ? 'selected' : ''}
                                    onClick={() => setCredentials(prev => ({ ...prev, groupId: group.id }))}>

                                    {credentials.groupId === group.id && <img className="green-v" src={v} />}
                                    {group.name}
                                </li>)}
                        </ul>

                        <button disabled={!(credentials.groupId)} onClick={onSubmitSignupForm}>Start</button>

                    </>}
                    {!shallowGame.groups?.length && <> <p>
                        במשחק זה אין קבוצות
                    </p>
                        <button onClick={onSubmitSignupForm}>Start</button>

                    </>}
                    {/* onclick=> save the group and start game */}

                    {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}

                </section>}
        </section>
    )
}