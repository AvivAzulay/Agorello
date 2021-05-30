export function CardDetailsMembers(props) {
    let initials = props.members.map((member, index) => {
        let splitedName = member.fullname.split(' ')
        let initials = splitedName.map(name => name[0])
        initials = initials.slice(0, 2)
        return <span key={index} className="user-img-chat-add">{initials}</span>
    })

    return (
        <div className="card-details-members">
            <h1>MEMBERS</h1>
            <div className="flex">{props.members.length > 0 && initials}</div>
        </div>
    )
}