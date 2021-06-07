import React, { Component } from 'react'
import { ActivitiesFilter } from './ActivitiesFilter.jsx'
import { BoardActivitiesList } from './BoardActivitiesList.jsx'
import { NavLink } from 'react-router-dom'

export class BoardHeader extends Component {

  state = {
    title: '',
    board: null,
    filterBy: '',
    prevTitle: '',
    isMenuOn: false,
    isEditing: false,
    isSetBackGround: false
  }

  inputRef = React.createRef()

  componentDidMount() {
    this.setState({ board: this.props.board, title: this.props.board.title, prevTitle: this.props.board.title })
    // this.inputRef.current.focus()
  }

  onSetFilter = (filterBy) => {
    // this.props.loadBoard(filterBy)
  }

  toggleMenu = () => {
    const { isMenuOn } = this.state
    this.setState({ ...this.state, isMenuOn: !isMenuOn, isSetBackGround: false })

  }

  toggleSetBackGround = () => {
    const { isSetBackGround } = this.state
    this.setState({ ...this.state, isSetBackGround: !isSetBackGround })
  }

  toggleEdditing = () => {
    const { isEditing } = this.state
    this.setState({ ...this.state, isEditing: !isEditing })
  }

  handleChange = (ev) => {
    const { value } = ev.target
    this.setState({ ...this.state, title: value })
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      this.onSubmit()
    }
  }

  onSubmit = () => {
    if (!this.state.title) {
      this.setState({ title: this.state.prevTitle })
      return
    }
    this.setState({ prevTitle: this.state.title })
    this.props.onUpdateBoard('title', this.state.title)
    this.toggleEdditing()
  }

  onSearch = (searchTxt) => {
  }

  render() {
    const backgroundURLs = [
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319331/background%20for%20Taskit/background_3_vbexy0.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319332/background%20for%20Taskit/background_20_quuo0j.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319336/background%20for%20Taskit/background_5_ymjrkv.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319336/background%20for%20Taskit/background_4_vzr9ec.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319325/background%20for%20Taskit/background_17_nktykt.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319326/background%20for%20Taskit/background_16_fiaoup.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319329/background%20for%20Taskit/background_2_gbvbi0.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319318/background%20for%20Taskit/background_15_fudzx7.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319322/background%20for%20Taskit/background_14_m8nec0.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319323/background%20for%20Taskit/background_18_zfjo3z.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319324/background%20for%20Taskit/background_19_frzs17.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319313/background%20for%20Taskit/background_11_beygjh.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319316/background%20for%20Taskit/background_12_cyljgs.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319318/background%20for%20Taskit/background_8_pfcpdw.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319318/background%20for%20Taskit/background_13_mg5pbg.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319307/background%20for%20Taskit/background_6_lqcaex.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319309/background%20for%20Taskit/background_10_isqnt4.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319309/background%20for%20Taskit/background_9_lyjw6z.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319310/background%20for%20Taskit/background_7_kdnduh.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319329/background%20for%20Taskit/background_1_veqold.jpg"
    ]

    const { isMenuOn, isSetBackGround, isEditing, title } = this.state
    if (!this.props.board) return <div>Loading...</div>
    return (
      <>
        <div className="borad-nav">
          <div className="borad-nav-left">
            {!isEditing && <h1 onClick={this.toggleEdditing}>{this.props.board.title}</h1>}
            {isEditing && <input
              className="borad-nav-title-edit"
              type="text"
              value={title}
              ref={this.inputRef}
              onBlur={this.onSubmit}
              placeholder="Board's name..."
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              onFocus={(ev) => ev.target.select()}
            >
            </input>}
            <ActivitiesFilter onSearch={this.onSearch} onSetFilter={this.onSetFilter} />
          </div>
          <button className="show-menu" onClick={this.toggleMenu} >Show menu</button>
          {isMenuOn && !isSetBackGround && <div className="side-menu">
            <div className="side-menu-title"><h1>Menu</h1><p className="side-menu-close" onClick={this.toggleMenu}></p></div>
            <button className="about-this-board"> About this Board</button>
            <button className="change-background" onClick={this.toggleSetBackGround}> Change background</button>
            <button className="board-analysis"> Board Analysis</button>
            <button className="labels"> Labels</button>
            <div className="edit-details-activity-header">
              <span>
                <p className="edit-details-activity-logo">
                  <div className="activity-title">Activitys</div>
                </p>
                <BoardActivitiesList activities={this.props.board.activities} />
              </span>
            </div>
          </div>}


          {isMenuOn && isSetBackGround && <div className="side-menu-background">
            <div className="side-menu-background-top"><p className="side-menu-back" onClick={this.toggleSetBackGround}></p><h1>Set BackGround</h1><p className="side-menu-close" onClick={this.toggleMenu}></p></div>
            <div className="thumbnail">
              {backgroundURLs.map((backgroundURL, index) =>
                <button key={index} onClick={() => this.props.onSetBackground(backgroundURL)} style={{ backgroundImage: `url(${backgroundURL})` }}></button>)}
            </div>
          </div>}
        </div>
      </>
    )
  }
}