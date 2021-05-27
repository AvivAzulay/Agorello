import React, { Component } from 'react'
<<<<<<< HEAD
import { connect } from 'react-redux'

import { saveGroup } from '../store/action/board.action.js'

class _GroupAdd extends Component {
=======


export class GroupAdd extends Component {
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
    state = {
        isEditing: false,
        group: {
            title: ''
        }
    }
    inputRef = React.createRef()

    componentDidUpdate() {
        this.state.isEditing && this.inputRef.current.focus()
    }
<<<<<<< HEAD
    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })

=======

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, group: { title: value } })
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.group.title) return
<<<<<<< HEAD
        this.props.saveGroup(this.state.group)
=======
        this.props.onSaveGroup(this.state.group)
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
        this.setState({ ...this.state, group: { title: '' } })
    }

    render() {
        const { isEditing, group: { title } } = this.state
        return (<React.Fragment>

            { !isEditing &&
                <div className="group-add-edit" >
                    <p className="add-txt" onClick={this.onToggleMode}>+ Add another list</p>
                </div>}

            {isEditing &&
                <div className="group-add-edit" >
                    <form action="">
                        <input type="text" ref={this.inputRef} value={title} onChange={this.handleChange} placeholder="Enter list title..." />
                        <button onClick={this.onSubmit}>Add list</button>
                        <button onClick={this.onToggleMode}>&times;</button>
                    </form>
                </div>}

        </React.Fragment>
        )
    }
}
<<<<<<< HEAD
function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {
    saveGroup
}

export const GroupAdd = connect(mapStateToProps, mapDispatchToProps)(_GroupAdd)
=======
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
