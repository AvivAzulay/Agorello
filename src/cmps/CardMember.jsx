export function CardMember(props) {
    const splitedName = props.boardMember.fullname.split(' ')
    let initials = splitedName.map(name => name[0])
    initials = initials.slice(0,2)
    console.log(props.cardMembers)
    let isChecked = false
    if (props.cardMembers.length ) {
        isChecked = Boolean(props.cardMembers.find(member => member._id === props.boardMember._id))
    }

    function onToggleState() {
        props.toggleMember(props.boardMember, isChecked)
        isChecked = !isChecked 
    }

    return (
        <div className="board-member" onClick={onToggleState}>
             <div>
                 - {initials} -
                 {props.boardMember.fullname}
                 {isChecked ? '✔' : ''}
                 </div>
        </div>
    )
}