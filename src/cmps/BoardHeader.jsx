import React, { Component } from 'react'
import { ActivitiesFilter } from './ActivitiesFilter.jsx'

export class BoardHeader extends Component {

  state = {
    filterBy: ''
  }
  onSetFilter = (filterBy) => {
    // this.props.loadBoard(filterBy)
  }

  onSearch = (searchTxt) => {
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

