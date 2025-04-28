import sparkleIcon from '../assets/img/sparkle2.png'

export function FancyTitle({ title}) {
    return (
        <div className="fancy-title">
            <img src={sparkleIcon} alt="sparkle" />
            <span>{title}</span>
            {/* <span className="select">בחר את האווטאר שלך</span> */}
            <img src={sparkleIcon} alt="sparkle" />
        </div>
    )
}