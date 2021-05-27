import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveCard } from '../store/action/board.action.js'

class _CardAdd extends Component {

    state = {
        editMode: false,
        card: {
            title: ''
        }
    }
    inputRef = React.createRef()

    componentDidMount() {
    }

    componentDidUpdate() {
        this.state.editMode && this.inputRef.current.focus()
    }

    onToggleMode = () => {
        const { editMode } = this.state
        this.setState({ ...this.state, editMode: !editMode })

    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, card: { title: value } })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.saveCard(this.state.card, this.props.groupId)
        this.setState({ ...this.state, card: { title: '' } })
        
    }

    render() {
        const { editMode, card: { title } } = this.state
        return (<React.Fragment>

            { !editMode &&
                <div className="card-add-edit" >
                    <p className="card-add-txt" onClick={this.onToggleMode}>Add another card</p>
                </div>}

            {editMode &&
                <div className="card-add-edit" >
                    <form action="">
                     <textarea type="text" ref={this.inputRef} value={title} placeholder='Enter a title for this card...' onChange={this.handleChange} />
                    <div className="card-add-btn" >
                    <span className="left-btn"> 
                      <button className="card-add-edit-btn"  onClick={this.onSubmit}>Add card</button>
                        <button className="card-add-exit-btn" onClick={this.onToggleMode}></button>
                      </span>
                        <button className="card-add-menu-btn" onClick={() => { }}></button>
                    </div>
                    
                    </form>
                </div>}

        </React.Fragment>
        )
    }
}

function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {
    saveCard
}

export const CardAdd = connect(mapStateToProps, mapDispatchToProps)(_CardAdd)
