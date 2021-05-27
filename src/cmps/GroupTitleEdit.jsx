import React, { Component } from 'react'

export class GroupTitleEdit extends Component {
    state = {
        isEditing: false,
        group: null,
        prevTitle: ''
    }

    inputRef = React.createRef()

    componentDidMount() {
        const { group } = this.props
        this.setState({ ...this.state, group: group, prevTitle: group.title })
    }

    componentDidUpdate() {
        this.state.isEditing && this.inputRef.current.focus()
    }

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })

    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, group: { ...this.state.group, title: value } })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { group, prevTitle } = this.state

        if (!group.title) {
            this.setState({ ...this.state, group: { ...group, title: prevTitle } })
            this.onToggleMode()
            return
        }

        this.setState({ ...this.state, prevTitle: group.title })
        this.props.saveGroup(this.state.group)
        this.onToggleMode()
    }

    render() {
        const { isEditing, group } = this.state
        const { title } = this.props
        return (
            <>
                {!isEditing && <h3 onClick={this.onToggleMode}>{title}</h3>}
                {isEditing &&
                    <form onSubmit={this.onSubmit} >
                        <input type="text" ref={this.inputRef} value={group.title} onChange={this.handleChange} ></input>
                    </form>
                }
            </>

        )
    }
}
