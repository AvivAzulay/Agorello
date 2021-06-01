import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getboards, addBoard } from '../store/action/board.action.js'

class _Boards extends Component {
  state = {
    boards: null
  }

  componentDidMount() {
    this.onLoadBoards()

  }


  onLoadBoards = () => {
    this.props.getboards()
    this.setState({ boards: this.props.boards })
  }


  onNewBoard = () => {
    this.props.addBoard()

  }


  render() {
    if (!this.state.boards) return <div>Loading...</div>
    return (
      <div>
        <div ><h1 className="borads-container-title">YOUR WORKSPACES</h1></div>
        <div className="borads-container">
          {this.props.boards.map((board, index) =>
            <NavLink to={`board/${board._id}?`} key={index}>
              <div className="borad-preview" key={index} style={{ backgroundImage: `url(${board.style.bgImg})` }}><span className="borad-preview-fade"></span><span className="borad-preview-fade">{board.title}</span> </div>
            </NavLink>)}
          <button className="borads-container-add-btn" onClick={this.onNewBoard}>Add new borad </button>
        </div>


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
  getboards,
  addBoard

}



export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)
