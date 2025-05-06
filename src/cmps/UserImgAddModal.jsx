import loader from '../assets/img/loader.gif'
import image from '../assets/img/img.png'
import plus from '../assets/img/plus-white.png'
import x from '../assets/img/x.png'


import { SelectedImg } from './SelectedImg'
import { FancyTitle } from './FancyTitle'

export function UserImgAddModal({ isLoading, media, onChangeFileInput, onCloseModal }) {
    return (
        <section className="user-img-add-modal">
            <img className="close" src={x} onClick={onCloseModal} />
            <FancyTitle title="העלה תמונה מותאמת אישית" variant="light" />

            <label htmlFor="user-img">
                {!media?.url && !isLoading && <img src={plus} alt="הוסף אווטאר" />}
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && media?.url && <SelectedImg imgUrl={media.url} />}
            </label>
            <input type="file" id="user-img" onChange={onChangeFileInput} hidden />

            <button className="big-btn" disabled={!(media?.url)} onClick={onCloseModal}>אישור</button>
        </section>
    )
}