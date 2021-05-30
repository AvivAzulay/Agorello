export function CardLabel(props) {
    let isChecked = false
    if (props.cardLabels.length) {
        isChecked = Boolean(props.cardLabels.find(label => label.id === props.boardLabel.id))
    }

    function onToggleState(ev) {
        ev.stopPropagation()
        props.toggleLabel(props.boardLabel, isChecked)
        isChecked = !isChecked
    }

    const { name, color } = props.boardLabel
    return (
        <div className="board-label" onClick={onToggleState}>
           <div>
            <span className={`board-label-name ${color}`}>{name}</span>
            </div>
            {isChecked ? <p></p> : null}
        </div>
    )
}