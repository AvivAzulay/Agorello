// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { loadBoard } from '../store/action/board.action.js'
// import { ActivitiesFilter } from './ActivitiesFilter.jsx'
// class _BoradNav extends Component {

//   state = {
//     title: '',
//     isEditing: false
//   }

//   componentDidMount() {
//     loadBoard()
//     const { loadBoard, board } = this.props
//     this.setState({ title: board.title })
//   }

//   onSetFilter = (filterBy) => {
//     this.props.loadBoard(filterBy)
//   }

//   onSearch = (searchTxt) => {
//     this.props.setFilter(this.props.filterBy, searchTxt)
//   }

//   onToggleMode = () => {
//     const { isEditing } = this.state
//     this.setState({ ...this.state, isEditing: !isEditing })
//   }

//   handleChange = ({ target }) => {
//     const { value } = target
//     this.setState({ ...this.state, title: value })
//   }

//   onSubmit = (ev) => {
//     // ev.preventDefault()
//     const { prevTitle, type } = this.state

//     // if (!type.title) {
//     //   this.setState({ ...this.state, type: { ...type, title: prevTitle } })
//     //   this.onToggleMode()
//     //   this.setState({ ...this.state, prevTitle: type.title })
//     //   return
//     // }
//     this.onToggleMode()
//   }

//   render() {
//     const { isEditing, title } = this.state
//     console.log('here?!');
//     if (!this.props.board) return <div>Loading...</div>
//     return (
//       <div className="borad-nav">
//         <div className="borad-nav-left">
//           {!isEditing && <h1 onClick={this.onToggleMode}>{this.props.board.title}</h1>}
//           {isEditing && <input
//             type="text"
//             value={title}
//             onChange={this.handleChange}
//             onBlur={this.onSubmit}
//             placeholder='Choose your board name...'
//           >
//           </input>}
//           <ActivitiesFilter onSearch={this.onSearch} onSetFilter={this.onSetFilter} />
//         </div>
//         <button className="show-menu">Show menu</button>
//       </div >
//     )
//   }
// }

// function mapStateToProps(state) {
//   return {
//     board: state.boardModule.board,
//   }
// }
// const mapDispatchToProps = {
//   loadBoard
// }



// export const BoradNav = connect(mapStateToProps, mapDispatchToProps)(_BoradNav)

