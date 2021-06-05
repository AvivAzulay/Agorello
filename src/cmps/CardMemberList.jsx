import React, { Component } from 'react'

import { CardMember } from './CardMember'

export class CardMemberList extends Component {
    state = {
        memberName: '',
        boardMembers: []
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.setState({ boardMembers: this.props.boardMembers })
        // this.inputRef.current.focus()
    }

    onClickBoardMember = (member, isChecked) => {
        let members = this.props.card.members
        let card = { ...this.props.card }
        if (!isChecked) {
            members.push(member)
            card.addedMember = member
            this.props.saveActivity(card, 'ADD_MEMBER')
        } else {
            members = members.filter(cardMember => cardMember._id !== member._id)
            card.removedMember = member
            this.props.saveActivity(card, 'REMOVE_MEMBER')
        }

        this.props.onUpdateCardProps('members', members)
    }

    handleChange = (ev) => {
        this.setState({ memberName: ev.target.value })
    }

    render() {
        let { boardMembers } = this.state
        if (! boardMembers ||  boardMembers.length === 0) return <h1>Loading...</h1>
        boardMembers = boardMembers.filter(member => member.fullname.toLowerCase().includes(this.state.memberName.toLowerCase()))
        return (
            <div className={`card-member-list ${this.props.modalLoc}`} onClick={(ev) => { ev.stopPropagation() }}>
                <div className="card-member-list-header">
                    <p></p>
                    <h3>Members</h3>
                    <button onClick={this.props.onToggle} className="close-save-edit "></button>
                </div>

                <input type="search" ref={this.inputRef} placeholder="Search members" name="memberName"
                    value={this.state.memberName} onChange={this.handleChange} />
                <h4>BOARD MEMBERS</h4>
                {boardMembers.map(member => {
                    return <CardMember key={member._id} boardMember={member}
                        cardMembers={this.props.card.members} toggleMember={this.onClickBoardMember} />
                })}
            </div>
        )

    }
}