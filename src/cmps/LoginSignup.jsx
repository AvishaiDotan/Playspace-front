import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { string, object } from 'yup';
import { showUserMsg } from '../services/event-bus.service';

import { LoadingScreen } from './LoadingScreen'

import playspaceLogoNew from '../assets/img/playspace-logo-new.png'
import sparkleIcon from '../assets/img/sparkle.png'
import user from '../assets/img/user-new.png'
import email from '../assets/img/email-new.png'

export function LoginSignup({ credentials, handleChange, onBtnClick, text, useEffectFunc, companyIcon }) {
    const location = useLocation()
    const isSignupPage = location.pathname.includes('signup')
    const sparkles = Array.from({ length: 6 }, (_, i) => i + 1)


    const formik = useFormik({
        initialValues: {
            name: credentials.name,
            email: credentials.email,
        },

        // validate: (values) => {
        //     const errors = {}
        //     if (!values.email || !values.name) {
        //         // errors.email = 'Required'
        //         showUserMsg('Required')
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         // errors.email = 'Invalid email address'
        //         showUserMsg('Invalid email address')
        //     }
        //     // else {
        //     //     showUserMsg('')
        //     // }
        //     return errors
        // },

        validationSchema: object({
            name: string()
                .required("נא למלא שם מלא")
                .test(
                    "no-hebrew",
                    "אנא הקלד באנגלית בלבד",
                    value => !value || !/[\u0590-\u05FF]/.test(value)
                ),
            email: string()
                .required("נא למלא כתובת אימייל")
                .test(
                    "no-hebrew",
                    "אנא הקלד באנגלית בלבד",
                    value => !value || !/[\u0590-\u05FF]/.test(value)
                )
                .test(
                    "has-at",
                    "כתובת האימייל חייבת לכלול '@'",
                    value => !value || value.includes('@')
                )
                .test(
                    "has-dot",
                    "כתובת האימייל חייבת לכלול סיומת (למשל .com)",
                    value => !value || /\.[a-zA-Z]{2,}$/.test(value)
                )
                .email("כתובת האימייל אינה תקינה"),
        }),
        onSubmit: (values) => {
            onBtnClick()
        },
    })

    function handleInputChange(ev) {
        formik.handleChange(ev)
        handleChange(ev)
    }
    return (
        <>
            <LoadingScreen useEffectFunc={useEffectFunc} companyIcon={companyIcon} />
            <section className="login-signup">
                {sparkles.map((num) => (
                    <div key={num} className={`sparkle sparkle${num}`}>
                        <img src={sparkleIcon} alt="sparkle" />
                    </div>
                ))}
                <img className="playspace-logo-new" src={playspaceLogoNew} />

                <form onSubmit={formik.handleSubmit} className="signup-form" id="signupForm" noValidate>
                    <span>{text}</span>

                    <div className="input-group">
                        <input placeholder="שם מלא" type="text" id="name" name="name" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.name} />
                        {/* <input placeholder="שם מלא" type="text" id="name" name="name" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.name} required /> */}
                        <img className="input-img user" src={user} />
                        {formik.touched.name && formik.errors.name && (
                            <div className="error">{formik.errors.name}</div>
                        )}
                    </div>

                    <div className="input-group">
                        <input placeholder="דוא״ל" type="email" id="email" name="email" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {/* <input placeholder="דוא״ל" type="email" id="email" name="email" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.email} required /> */}
                        <img className="input-img email" src={email} />
                        {formik.touched.email && formik.errors.email && (
                            <div className="error">{formik.errors.email}</div>
                        )}
                    </div>

                    <button type="submit" dir="rtl">
                        {isSignupPage ? "הירשם" : "בואו נתחיל!"}
                    </button>

                </form>
                {/* <div className="bottom-text">
                    {isSignupPage ? (
                        <>
                            <span>כבר יש לך חשבון? </span>
                            <Link to="/login" className="bottom-link">התחבר</Link>
                        </>
                    ) : (
                        <>
                            <span>אין לך חשבון? </span>
                            <Link to="/signup" className="bottom-link">הירשם כאן</Link>
                        </>
                    )}
                </div> */}
            </section>
        </>
    )
}