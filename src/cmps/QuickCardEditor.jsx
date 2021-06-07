import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCard, saveActivity } from '../store/action/board.action'
import { SmartTitleEdit } from './SmartTitleEdit'
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


export class QuickCardEditor extends Component {
  // state = {
  //   card: null,
  //   isCardDueDateShowenRight: false,
  //   isDueDateListShowenLeft: false,
  //   isNewTodoShown: false,
  //   isModalShown: false,
  //   modalType: '',
  //   modalLoc: '',
  //   isCoverListShowen: false,
  // }
  // componentDidMount() {
  //   const cardId = this.props.cardId
  //   this.onLoadCard(cardId)
  // }
  // onLoadCard = (cardId) => {
  //   const group = this.props.board.groups.find(group =>
  //     group.cards.find(card => card.id === cardId))
  //   const card = group.cards.find(card => card.id === cardId)
  //   this.setState({ card })
  // }
  // rander() {
  //   return (
  //     <div className="edit-add-to-card">
  //       <div className="window-screen" onClick={() => this.props.history.push(`/board/${this.props.board._id}`)}>
  //         <div className="edit-add-to-card-btn-continer">
  //           <button className="edit-add-to-card-members"
  //             onClick={() => {
  //               this.onToggleModal()
  //               this.setState({ modalType: 'members', modalLoc: 'modal-right' })
  //             }
  //             }> Members</button>



  //           <button className="edit-add-to-card-labels"
  //             onClick={() => {
  //               this.onToggleModal()
  //               this.setState({ modalType: 'labels', modalLoc: 'modal-right' })
  //             }
  //             }> Labels</button>

  //           <button className="edit-add-to-card-checklist"
  //             onClick={() => {
  //               this.onToggleModal()
  //               this.setState({ modalType: 'checklist', modalLoc: 'modal-right' })
  //             }
  //             }> Checklist</button>


  //           <button className="edit-add-to-card-dates"
  //           > Dates
  //                   <div className="card-date-pos">
  //               {
  //                 <CardDateSetter
  //                   dueDate={this.state.card.dueDate}
  //                   onToggle={this.onToggleDueDateRight}
  //                   onUpdateCardProps={this.onUpdateCardProps}
  //                   card={card}
  //                 />}
  //             </div>
  //           </button>


  //           <input
  //             accept="image/*"
  //             style={{ display: 'none' }}
  //             id="raised-button-file"
  //             multiple
  //             type="file"
  //             onSubmit={this.onAttachmentFile}
  //           />
  //           <label htmlFor="raised-button-file">
  //             <button className="edit-add-to-card-attachment">
  //               Attachment
  //                       <UplodeImg
  //                 card={card}
  //                 onUpdateCardProps={this.onUpdateCardProps}
  //               /></button>
  //           </label>


  //           <div style={{ position: "relative" }}>
  //             <button className="edit-add-to-card-cover" onClick={this.onToggleCover}> Cover</button>
  //             <CardCoverList
  //               onUpdateCardProps={this.onUpdateCardProps}
  //               onToggle={this.onToggleCover}
  //               isCoverListShowen={this.state.isCoverListShowen}
  //             />
  //           </div>
  //           {this.state.isModalShown && <CardDetailsModal
  //             modalType={this.state.modalType}
  //             modalLoc={this.state.modalLoc}
  //             card={card}
  //             board={this.props.board}
  //             saveActivity={this.props.saveActivity}
  //             boardMembers={this.props.board.members}
  //             onUpdateCardProps={this.onUpdateCardProps}
  //             onToggleModal={this.onToggleModal}
  //             boardLabels={this.props.board.labels} />
  //           }

  //           {this.state.isModalShown && <CardDetailsModal
  //             modalType={this.state.modalType}
  //             modalLoc={this.state.modalLoc}
  //             card={card}
  //             saveActivity={this.props.saveActivity}
  //             boardMembers={this.props.board.members}
  //             onUpdateCardProps={this.onUpdateCardProps}
  //             onToggleModal={this.onToggleModal}
  //             boardLabels={this.props.board.labels} />
  //           }
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}