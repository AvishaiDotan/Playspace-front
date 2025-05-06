// import { User } from "./User";
import { useEffect, useRef, useState } from "react";

import { SelectedImg } from './SelectedImg'
// import { faL } from "@fortawesome/free-solid-svg-icons";
// import arrowRight from '../assets/icons/caret-right-solid.svg'
// import arrowLeft from '../assets/icons/caret-left-solid.svg'

// if i want the svg like svg
// import {ReactComponent as ReactLogo} from './logo.svg';

export function Carousel({ items, setCredentials, userImg, Comp1, Comp2, ...restOfProps }) {
    const [isDragging, setIsDragging] = useState()
    const [startX, setStartX] = useState()
    const [startScrollLeft, setStartScrollLeft] = useState()
    const [startOfScroll, setStartOfScroll] = useState(true)
    const [endOfScroll, setEndOfScroll] = useState(false)
    let carousel = useRef()

    useEffect(() => {
        document.addEventListener('mouseup', dragStop)
        carousel.current.addEventListener('scroll', startEndScroll)

        return () => {
            document.removeEventListener('mouseup', dragStop)
        }
    }, [])

    useEffect(() => {
        if (!carousel) return
        checkIfHasScroll()
    }, [carousel?.current?.scrollWidth])

    function startEndScroll() {
        setStartOfScroll(carousel.current.scrollLeft === 0)
        setEndOfScroll(Math.abs(carousel.current.scrollWidth - carousel.current.scrollLeft - carousel.current.clientWidth) < 1)
    }

    function checkIfHasScroll() {
        if (carousel.current.scrollWidth === carousel.current.clientWidth) {
            setEndOfScroll(true)
        } else {
            setEndOfScroll(false)
        }
    }

    function dragStart(ev) {
        setIsDragging(true)
        setStartX(ev.pageX || ev.touches[0].clientX)
        setStartScrollLeft(carousel.current.scrollLeft)
    }
    function dragging(ev) {
        if (!isDragging) return
        let x = ev.pageX || ev.touches[0].clientX
        carousel.current.scrollLeft = startScrollLeft - (x - startX)
    }

    function dragStop() {
        setIsDragging(false)
    }

    function moveCarousel(direction) {
        const firstCardWidth = carousel.current.offsetWidth
        carousel.current.scrollLeft += (direction === 'left') ? -firstCardWidth : firstCardWidth
    }

    if (!items) return ''
    return (
        <div className="wrapper">
            {/* {!startOfScroll && <button onClick={() => moveCarousel('left')} className="arrow">
                <img src={arrowLeft} />
            </button>} */}
            <ul ref={carousel} className={`carousel ${isDragging ? 'dragging' : ''}`}
                onMouseDown={dragStart} onMouseMove={dragging}
                onTouchStart={dragStart} onTouchMove={dragging}>
                {items.map((item, i) => <li className="card" key={item._id || i}>
                    {/* {item} */}
                {console.log('item', item)}
                    {userImg !== item && <img onClick={() => setCredentials(prev => ({ ...prev, media: { url: item, type: 'image' } }))} src={item} />}
                    {userImg === item && <SelectedImg imgUrl={item} />}


                    {/* <Comp1 item={item} isDragging={isDragging} {...restOfProps} /> */}
                </li>
                )}
                {/* plus at the end of the highlights */}
                {Comp2 && <Comp2 />}
            </ul>
            {/* {!endOfScroll && <button onClick={() => moveCarousel('right')} className="arrow">
                <img src={arrowRight} />
            </button  >} */}
        </div>
    )
}