export function CardDetailsLabels(props) {
    let lables = props.labels.map((label, index) => {
        return <span key={index} className="user-img-chat-add">{label.name}</span>
    })

    return (
        <div className="card-details-labels">
            <h1>LABELS</h1>
            <div className="flex">{props.labels.length > 0 && lables}
                <div className="card-details-labels-open clickable" onClick={() => props.onToggle()}></div>
            </div>
        </div>

    )
}