// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { boardService } from '../services/board-service'
// import { saveCard } from '../store/action/board.action'
// import { SmartTitleEdit } from './SmartTitleEdit'
// import { CardDescription } from './CardDescription'
// import { CardMemberList } from './CardMemberList'

// export class _CardDetails extends Component {
//     state = {
//         card: null,
//     }

//     componentDidMount() {
//         const id = this.props.cardId
//         const card = boardService.getCardById(id)
//         this.setState({ card })
//     }

//     onUpdateCardProps = (key, value) => {
//         const { card } = this.state
//         card[key] = value
//         this.onSaveCard(card)
//     }

//     onSaveCard = () => {
//         const { card } = this.state
//         this.props.saveCard(card, card.currGroup.groupId)
//     }

//     render() {
//         const { card } = this.state
//         if (!card) return <h1>Loadi!!!ng...</h1>
//         // if (!users || users.length === 0) return <h1>Loading...</h1>
//         return (
//             <div className="card-details-temp" >
//                 <h1>YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</h1>
//                 <SmartTitleEdit title={card.title} group={card} onSaveCard={this.onSaveCard} />   {/*  TODO: at description. chek if neccessery to give him 'onSaveCard' */}
//                 <CardDescription description={card.description} onUpdateCardProps={this.onUpdateCardProps} onSaveCard={this.onSaveCard} />
//                 <CardMemberList boardMembers={this.props.board.members} onUpdateCardProps={this.onUpdateCardProps} card={card} />
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         board: state.boardModule.board,
//     }
// }
// const mapDispatchToProps = {
//     saveCard,
// }

// export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)