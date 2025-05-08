import sparkle3 from '../assets/img/sparkle3.png'
import sparkles from '../assets/img/sparkles.png'

export function GroupJoinModal({ group, icon, onClose, onConfirm, onSubmitSignupForm }) {
    if (!group) return

    function handleJoinGroup() {
        onConfirm(group.id)
        onSubmitSignupForm()
        onClose()
    }

    return (
        <div className="group-modal">
            <div className="modal-content">
                <div className="sparkles-img-container">
                    <img className="sparkle3" src={sparkle3} alt="sparkle3" />
                    <img className="sparkles" src={sparkles} alt="sparkles" />
                </div>
                <div className="modal-body">
                    {icon && <img className="icon" src={icon} alt="icon" />}
                    <h2>איזה כיף!</h2>
                    <p>הצטרפת לקבוצה {group.name}!</p>
                    <button className="blue-btn"onClick={handleJoinGroup}>המשך</button>
                </div>
            </div>
        </div>
    )
}