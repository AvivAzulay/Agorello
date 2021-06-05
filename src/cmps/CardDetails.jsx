import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCard, saveActivity } from '../store/action/board.action'
import { GroupTitleEdit } from './GroupTitleEdit'
import { CardDescription } from './CardDescription'
import { CardDetailsMembers } from './CardDetailsMembers'
import { CardDetailsLabels } from './CardDetailsLabels'
import { CardDetailsDate } from './CardDetailsDate'
import { CardDateSetter } from './CardDateSetter'
import { CardCheckListContainer } from './CardCheckListContainer'
import { CardActivitiesList } from './CardActivitiesList'
import { AttachmentsList } from './AttachmentsList'
import { CardComment } from './CardComment'
import { UplodeImg } from './UplodeImg'
import { CardDetailsModal } from './CardDetailsModal'
import { CardCoverList } from './CardCoverList'

export class _CardDetails extends Component {
  state = {
    card: null,
    isCardDueDateShowenRight: false,
    isDueDateListShowenLeft: false,
    isNewTodoShown: false,
    isModalShown: false,
    modalType: '',
    modalLoc: '',
    isCoverListShowen:false,
  }

  componentDidMount() {
    const cardId = this.props.cardId
    this.onLoadCard(cardId)
  }

  onLoadCard = (cardId) => {
    const group = this.props.board.groups.find(group =>
      group.cards.find(card => card.id === cardId))
    const card = group.cards.find(card => card.id === cardId)
    this.setState({ card })
  }

  onUpdateCardProps = (key, value) => {
    const { card } = this.state
    card[key] = value
    this.setState({ card }, () => this.onSaveCard(card))
  }

  onSaveCard = () => {
    const { card } = this.state
    this.props.saveCard(card, card.currGroup.groupId)
  }

  onToggleDueDateRight = () => {
    this.setState({ isDueDateListShowenRight: !this.state.isDueDateListShowenRight })
    this.setState({ isDueDateListShowenLeft: false })
  }

  onToggleDueDateLeft = () => {
    this.setState({ isDueDateListShowenLeft: !this.state.isDueDateListShowenLeft })
    this.setState({ isDueDateListShowenRight: false })
  }

  onToggleCover = () => {
    this.setState({ isCoverListShowen: !this.state.isCoverListShowen }) 
  }

  onToggleModal = () => {
    this.setState({ isModalShown: !this.state.isModalShown })
  }

  onCloseModals = (ev) => {
    ev.stopPropagation()
    if (this.state.isModalShown === true) this.setState({isModalShown: false})
    if (this.state.isCardDueDateShowenRight === true) this.setState({ isCardDueDateShowenRight: false })
    if (this.state.isCardDueDateShowenLeft === true) this.setState({ isCardDueDateShowenLeft: false })
    this.setState({ isNewTodoShown: false })
  }
  render() {
    const { card } = this.state
    if (!card) return <></>
    return (
     
      <div className="window-screen" onClick={() => this.props.history.push('/board${this.props.board._id}')}>

        <div className="edit" onClick={this.onCloseModals}>
       
        {card.cover&& <div> <img className="card-details-cover" src={card.cover} alt=""  /> </div>}
         <div className="edit-contaner">
                <div className="edit-details-header">
                  <p className="edit-details-header-logo"></p>
                  <GroupTitleEdit title={card.title} board={this.props.board} card={card} saveCard={this.props.saveCard} />
                  <button className="close-save-edit-top" onClick={() => this.props.history.push(`/board/${this.props.board._id}`)} ></button>
                </div>
          
          <div className="edit-body">
            <div className="edit-details">
              <span className="list-pages">In list pages</span>



              {/* 
              #########################################
              ###########                 #############
              #####^^^^  CARD PROPS DISPLAY   ^^^^#####
              ###########                 #############
              #########################################
               */}
              <div className="flex members-labels-container">
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.members.length > 0 && <div>
                          <CardDetailsMembers members={card.members}
                            onToggle={() => {
                              this.onToggleModal()
                              this.setState({modalType: 'members', modalLoc: 'modal-left'})}
                              } /></div>}

                        
                      </div>
                    </>
                  </>
                </>

                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.labels.length > 0 &&
                          <div><CardDetailsLabels
                            labels={card.labels}
                            onToggle={() => {
                              this.onToggleModal()
                              this.setState({modalType: 'labels', modalLoc: 'modal-left'})}
                              } />
                          </div>}
                        
                      </div>
                    </>
                  </>
                </>
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.dueDate &&
                          <CardDetailsDate
                            card={card}
                            onToggle={this.onToggleDueDateLeft}
                            saveActivity={this.props.saveActivity}
                            onUpdateCardProps={this.onUpdateCardProps}
                          />
                        }
                        <div className="card-date-pos">
                          {this.state.isCardMemberListShowenLeft &&
                            <CardDetailsDate
                              card={card}
                              onToggle={this.onToggleDueDateRight}
                              saveActivity={this.props.saveActivity}
                              onUpdateCardProps={this.onUpdateCardProps}
                            />}
                        </div>
                      </div>
                    </>
                  </>
                </>
              </div>


              {/* 
              #########################################
              ###########                 #############
              ####^^^^^^ CARD EDIT BUDTTONS ^^^^^^^####
              ###########                 #############
              #########################################
               */}


              <div className="edit-details-description">
                <div className="edit-details-description-header">
                  <p className="edit-details-description-logo"></p>
                  <h1>Description</h1>
                </div>
                <CardDescription
                  description={card.description}
                  onUpdateCardProps={this.onUpdateCardProps}
                  onSaveCard={this.onSaveCard} />
              </div>


              <div className="edit-details-attachments">
                <div className="edit-details-attachments-header">
                  <p className="edit-details-attachments-logo"></p>
                  <h1>Attachments</h1>
                </div>
                <AttachmentsList
                  card={card}
                />
              </div>



              <div>
                <CardCheckListContainer
                  card={card}
                  // checklist={card.checklist}
                  saveActivity={this.props.saveActivity}
                  onUpdateCardProps={this.onUpdateCardProps} />
                {/* <CardCheckListList onUpdate={this.onUpdateChecklists} /> */}
              </div>
              <>
                <>
                  <>
                    <div>
                      <div className="edit-details-activity-header">
                        <span>
                          <p className="edit-details-activity-logo"></p>
                          <h1>Activity</h1>
                        </span>
                        <button>Show details</button>
                      </div>
                      <div className="edit-activity-description">
                        <CardComment
                          card={card}
                          saveActivity={this.props.saveActivity}
                          onUpdateCardProps={this.onUpdateCardProps}
                        />
                        <div>
                          <CardActivitiesList card={card} activities={this.props.board.activities} />
                        </div>
                      </div>
                    </div>
                  </>
                </>
              </>
            </div >


            <div className="edit-add-to-card">
              <h1> ADD TO CARD </h1>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-members"
                      onClick={() => {
                        this.onToggleModal()
                        this.setState({modalType: 'members', modalLoc: 'modal-right'})}
                        }> Members</button>
                  
                  </>
                </>
              </>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-labels"
                      onClick={() => {
                        this.onToggleModal()
                        this.setState({modalType: 'labels', modalLoc: 'modal-right'})}
                        }> Labels</button>
                    
                  </>
                </>
              </>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-checklist"
                      onClick={() => {
                        this.onToggleModal()
                        this.setState({modalType: 'checklist', modalLoc: 'modal-right'})}
                        }> Checklist</button>
                    
                  </>
                </>
              </>
              <>
                <>
                  <>
                    
                    <button className="edit-add-to-card-dates"
                    > Dates
                    <div className="card-date-pos">
                        {
                          <CardDateSetter
                            dueDate={this.state.card.dueDate}
                            onToggle={this.onToggleDueDateRight}
                            onUpdateCardProps={this.onUpdateCardProps}
                            card={card}
                          />}
                      </div>
                    </button>
                  </>
                </>
              </>
              <>
                <>
                  <>

                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onSubmit={this.onAttachmentFile}
                    />
                    <label htmlFor="raised-button-file">
                      <button className="edit-add-to-card-attachment">
                        Attachment
                        <UplodeImg onUpdateCardProps={this.onUpdateCardProps} /></button>
                    </label>


                    <div style={{position: "relative"}}>
                    <button className="edit-add-to-card-cover" onClick={this.onToggleCover}> Cover</button>
                     <CardCoverList  
                     onUpdateCardProps={this.onUpdateCardProps}
                     onToggle={this.onToggleCover}
                     isCoverListShowen={this.state.isCoverListShowen}
                     />
                     </div>
                    
                    {this.state.isModalShown && <CardDetailsModal 
                    modalType={this.state.modalType} 
                    modalLoc={this.state.modalLoc}
                    card={card} 
                    saveActivity={this.props.saveActivity}
                    boardMembers={this.props.board.members}
                    onUpdateCardProps={this.onUpdateCardProps}
                    onToggleModal={this.onToggleModal}
                    boardLabels={this.props.board.labels}/>
                    } 
                  </>
                </>
              </>
              </div>
            </div>
          </div>
        </div >
      </div >
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
  saveActivity,
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)