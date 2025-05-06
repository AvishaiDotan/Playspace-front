import { useEffect, useRef } from 'react'
import vectorLeft from '../assets/img/vector-left.png'
import vectorRight from '../assets/img/vector-right.png'
import playspaceLogo from '../assets/img/playspace-logo-new.png'
import x from '../assets/img/x.png'
import companyIconDefault from '../assets/img/company-logo.png'
import { BackgroundGlow } from './BackgroundGlow'

export function LoadingScreen({ useEffectFunc, companyIcon }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.classList.add('fade')
                if (useEffectFunc) {
                    useEffectFunc()
                }
            }
        }, 2500)
    }, [])

    return (
        <section ref={sectionRef} className="loading-screen">
            <div className="content">
                <img className="playspace-logo" src={playspaceLogo} />
                <div className="company-logo-container">
                    <img className="company-logo"
                        src={companyIcon?.url || companyIconDefault} />
                </div>
            </div>
            <BackgroundGlow />
        </section>
    )
}