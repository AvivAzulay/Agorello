export function CardDetailsMembers(props) {
    let initials = props.members.map(member => {
        let splitedName = member.fullname.split(' ')
        let initials = splitedName.map(name => name[0])
        initials = initials.slice(0, 2)
        return <span className="user-img-chat-add">{initials}</span>
    })
    
    return (
        <div>
            <h1>MEMBERS</h1>
            <div className="flex">{props.members.length > 0 && initials}</div>
        </div>
    )
}