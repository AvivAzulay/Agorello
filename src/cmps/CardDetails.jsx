import React, { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board-service'
import { saveCard } from '../store/action/board.action'
import { GroupTitleEdit } from './GroupTitleEdit'
import { CardDescription } from './CardDescription'
import { CardMemberList } from './CardMemberList'
import { CardDetailsMembers } from './CardDetailsMembers'

export class _CardDetails extends Component {
  state = {
    card: null,
    isCardMemberListShowen: false
  }

  componentDidMount() {
    const id = this.props.cardId
    const card = boardService.getCardById(id)
    this.setState({ card })
  }

  onUpdateCardProps = (key, value) => {
    const { card } = this.state
    card[key] = value
    this.setState({ card })
    this.onSaveCard(card)
  }

  onSaveCard = () => {
    const { card } = this.state
    this.props.saveCard(card, card.currGroup.groupId)
  }

  render() {
    const { card } = this.state
    if (!card) return <h1>Loading...</h1>
    return (
     <div className="window-screen">
     <div className="edit">
        <div className="edit-details-header">
          <p className="edit-details-header-logo"></p>
          <GroupTitleEdit title={card.title} group={card} />
          <button className="close-save-edit"></button>
        </div>
        <div className="edit-body">
          <div className="edit-details">
            <span className="list-pages">In list pages</span>
            {card.members.length > 0 && <CardDetailsMembers members={card.members} />}
            <div className="edit-details-description">
              <div className="edit-details-description-header">
                <p className="edit-details-description-logo"></p>
                <h1>Description</h1>
              </div>
              <CardDescription description={card.description} onUpdateCardProps={this.onUpdateCardProps} onSaveCard={this.onSaveCard} />
            </div>
            <div>
              <div className="edit-details-activity-header">
                <span>
                  <p className="edit-details-activity-logo"></p>
                  <h1>Activity</h1>
                </span>
                <button>Show details</button>
              </div>
              <div className="edit-activity-description">
                <div className='user-img-chat-add'>G</div>
                <textarea readOnly className="edit-activity-description-textarea" type="text" value='Add a more detailed description...' />
              </div>
            </div>
            {this.state.isCardMemberListShowen && <CardMemberList boardMembers={this.props.board.members} onUpdateCardProps={this.onUpdateCardProps} card={card} />}
          </div >
          <div className="edit-add-to-card">
            <h1> ADD TO CARD </h1>
            <button className="edit-add-to-card-members"
              onClick={() => { this.setState({ isCardMemberListShowen: !this.state.isCardMemberListShowen }) }}> Members</button>
            <button className="edit-add-to-card-labels"> Labels</button>
            <button className="edit-add-to-card-checklist"> Checklist</button>
            <button className="edit-add-to-card-dates"> Dates</button>
            <button className="edit-add-to-card-attachment"> Attachment</button>
            <button className="edit-add-to-card-cover"> Cover</button>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  }
}
const mapDispatchToProps = {
  saveCard,
}
export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)