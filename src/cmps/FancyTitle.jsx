import sparkleIcon from '../assets/img/sparkle2.png'

export function FancyTitle({ title, variant}) {
    return (
        <div className={`fancy-title ${variant === 'light' ? 'light' : ''}`}>
        {/* <div className="fancy-title"> */}
            <img src={sparkleIcon} alt="sparkle" />
            <span>{title}</span>
            <img src={sparkleIcon} alt="sparkle" />
        </div>
    )
}