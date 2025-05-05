import v from '../assets/img/v-white.png'

export function SelectedImg({ imgUrl }) {
    return (
        <section className="selected-img">
            <div className="v-container">
                <img className="v" src={v} />
            </div>
            <img className="media-url" src={imgUrl} />
        </section>
    )
}