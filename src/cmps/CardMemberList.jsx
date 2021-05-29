import React, { Component } from 'react'

import { CardMember } from './CardMember'

export class CardMemberList extends Component {
    state = {
        memberName: '',
        boardMembers: []
    }

    inputRef = React.createRef()
    
    componentDidMount() {
       this.setState({ boardMembers: this.props.boardMembers})
       this.inputRef.current.focus()
    }

    onClickBoardMember = (member, isChecked) => {
        let txt = '' // for actions
        let members = this.props.card.members
        // if (!members) members = []
        if (!isChecked) {
            members.push(member)
            txt = `added ${member.fullName}`
        } else {
            members = members.filter(cardMember => cardMember._id !== member._id)
            txt = `removed ${member.fullName}`
        }
        this.props.onUpdateCardProps('members', members)
    }

    handleChange = (ev) => {
        this.setState({memberName: ev.target.value})
    }

    render() {
        let {  boardMembers } = this.state
        // if (! boardMembers ||  boardMembers.length === 0) return <h1>Loading...</h1>
        boardMembers = boardMembers.filter(member => member.fullname.toLowerCase().includes(this.state.memberName.toLowerCase()))
        return (
            <div className="card-member-list">
                <h3>Members</h3>
                <button className="close-save-edit"></button>
                <input type="search" ref={this.inputRef} placeholder="Search members" name="memberName"
                value={this.state.memberName} onChange={this.handleChange}/> 
                <h4>BOARD MEMBERS</h4>
                {boardMembers.map(member => {
                    return <CardMember key={member._id} boardMember={member} 
                    cardMembers={this.props.card.members} toggleMember={this.onClickBoardMember}/>
                })}
            </div>
        )

    }
}