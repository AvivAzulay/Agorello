import React, { Component } from 'react'
import { utilService } from '../services/util-service'

export class CardAddCheckList extends Component {
    state = {
        title: 'Checklist',
        // card: null
    }

    inputRef = React.createRef()

    componentDidMount() {
        // this.setState({card: this.props.state})
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        this.setState({ title: ev.target.value })
    }

    onAdd = () => {
        const { card, onUpdateCardProps, saveActivity } = this.props
        const list = {
            id: utilService.makeId(),
            title: this.state.title,
            todos: []
        }

        card.checklist.push(list)
        onUpdateCardProps('checklist', card.checklist)

        //Add new card activity
        const newCard = { ...card }
        newCard.currList = list
        saveActivity(newCard, 'ADD_CHECKLIST')
    }

    render() {
        let { title } = this.state
        // if (! boardLabels ||  boardLabels.length === 0) return <h1>Loading...</h1>
        return (
            <div className="card-add-checklist" onClick={(ev) => { ev.stopPropagation() }}>
                <h3>Add checklist</h3>
                <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-label"></button>
                <h4>Title</h4>
                <input type="txt" onFocus={(ev) => ev.target.select()} ref={this.inputRef} placeholder="Search labels" name="labelName"
                    value={title} onChange={this.handleChange} />
                <div></div>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )

    }
}