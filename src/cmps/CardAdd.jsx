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
                <div className="card-add" >
                    <button onClick={this.onToggleMode}>Add another card</button>
                </div>}

            {editMode &&
                <div className="card-add-edit" >
                    <form action="">
                        <input type="text" ref={this.inputRef} value={title} onChange={this.handleChange} />
                        <button onClick={this.onSubmit}>Add card</button>
                        <button onClick={this.onToggleMode}>&times;</button>
                        <button onClick={() => { }}>...menu</button>
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
