import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/action/board.action.js'
import { ActivitiesFilter } from './ActivitiesFilter.jsx'
class _BoradNav extends Component {

  state = {

  }

  componentDidMount() {
    this.props.loadBoard()
  }


  onSetFilter = (filterBy) => {
    this.props.loadBoard(filterBy)
  }

  onSearch = (searchTxt) => {
    this.props.setFilter(this.props.filterBy, searchTxt)
  }

  render() {
    if (!this.props.board) return <div>Loading...</div>
    return (
      <div className="borad-nav">
        <div className="borad-nav-left">
          <h1>{this.props.board.title}</h1>
          <ActivitiesFilter onSearch={this.onSearch} onSetFilter={this.onSetFilter} />
        </div>
        <button className="show-menu">Show menu</button>
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
  loadBoard
}



export const BoradNav = connect(mapStateToProps, mapDispatchToProps)(_BoradNav)

