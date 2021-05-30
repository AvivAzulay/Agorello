import React, { Component } from 'react'

export class GroupTitleEdit extends Component {
    state = {
        isEditing: false,
        group: null,
        card: null,
        prevTitle: ''
    }
    // inputRef = React.createRef()
    componentDidMount() {
        const { card, group } = this.props

        if (group) {
            this.setState({ ...this.state, group: group, prevTitle: group.title, type: { ...group } })
        }
        if (card) {
            this.setState({ ...this.state, card: card, prevTitle: card.title, type: { ...card } })
        }
    }

    componentDidUpdate() {
        // this.state.isEditing && this.inputRef.current.focus()
    }

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, type: { ...this.state.type, title: value } })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { prevTitle, type } = this.state

        if (!type.title) {
            this.setState({ ...this.state, type: { ...type, title: prevTitle } })
            this.onToggleMode()
            this.setState({ ...this.state, prevTitle: type.title })
            return
        }
        this.onToggleMode()
    }

    render() {
        const { group, card, type } = this.state

        if ((!group && !card)) return <div>Loading...</div>
        return (
            <textarea className="edit-details-textarea-header"
                type="text"
                value={type.title}
                onChange={this.handleChange}
                onBlur={this.onSubmit}>
            </textarea>
        )
    }
}