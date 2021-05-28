import React, { Component } from 'react'

import { CardMember } from './CardMember'

export class CardMemberList extends Component {
    state = {
        filterBy: '',
        boardMembers: []
    }

    componentDidMount() {
       this.setState({ boardMembers: this.props.boardMembers})
    }

    onClickBoardMember = (member, isChecked) => {
        let txt = '' // for actions
        const members = this.props.card.members
        // if (!members) members = []
        if (!isChecked) {
            console.log(member, members)
            members.push(member)
            txt = `added ${member.fullName}`
        } else {
            members = members.filter(cardMember => cardMember._id !== member._id)
            txt = `removed ${member.fullName}`
        }
        this.props.onUpdateCardProps('members', members)
    }

    render() {
        const {  boardMembers } = this.state
        if (! boardMembers ||  boardMembers.length === 0) return <h1>Loading...</h1>
        
        return (
            <div className="card-member-list">
                <h3>Members</h3>
                <input type="search" placeholder="Search members" name="searchMember" onChange={this.handleChange}/> 
                <h4>BOARD MEMBERS</h4>
                {boardMembers.map(member => {
                    return <CardMember key={member._id} boardMember={member} 
                    cardMembers={this.props.card.members} toggleMember={this.onClickBoardMember}/>
                })}
            </div>
        )

    }
}