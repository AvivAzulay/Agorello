import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadBoards, addBoard } from '../store/action/board.action.js'
import { BoardAdd } from '../cmps/BoardAdd'

class _Boards extends Component {
  state = {
    boards: null,
    addNewModal: false,
  }

  componentDidMount() {
    this.onLoadBoards()
  }

  onLoadBoards = () => {
    this.props.loadBoards()
    this.setState({ boards: this.props.boards })
  }

  onNewBoard = (title, backgroundURL) => {
    return this.props.addBoard(title, backgroundURL, this.props.history)
  }

  toggleModal = () => {
    const { addNewModal } = this.state
    this.setState({ ...this.state, addNewModal: !addNewModal })
  }

  render() {
    const TemplateBoards = this.props.boards.filter(board => board.isTemplate);
    const NoTemplateBoards = this.props.boards.filter(board => !board.isTemplate);
    if (!this.state.boards) return <div>Loading...</div>
    const { addNewModal } = this.state
    return (
      <div className="borads">
        <div className="home-nav"></div>
        <h1 className="borads-container-title">Suggested Templates</h1>
        <div className="borads-container">
          {TemplateBoards.map((board, index) =>
            <div className="borad-preview" key={index}
              style={{ backgroundImage: `url(${board.style.bgImg})` }}
              onClick={() => this.props.addBoard(board.title, board.style.bgImg, this.props.history, board)} >
              <span className="borad-preview-fade"></span>
              <span className="borad-preview-fade">{board.title}</span> </div>
          )}
        </div>
        <h1 className="borads-container-title">Your Boards</h1>
        <div className="borads-container">
          {NoTemplateBoards.map((board, index) =>
            <NavLink to={`board/${board._id}?`} key={index}>
              <div className="borad-preview" key={board._id} style={{ backgroundImage: `url(${board.style.bgImg})` }}><span className="borad-preview-fade"></span><span className="borad-preview-fade">{board.title}</span> </div>
            </NavLink>)}
          <button className="borads-container-add-btn" onClick={this.toggleModal}>Add new borad </button>
        </div>
        {addNewModal && <BoardAdd onNewBoard={this.onNewBoard} toggleModal={this.toggleModal} boards={this.props.boards} history={this.props.history} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
  }
}

const mapDispatchToProps = {
  loadBoards,
  addBoard
}
export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)
