import React, { Component } from 'react'
import { Checkbox } from '@material-ui/core'
import { CardDateSetter } from './CardDateSetter'
export class CardDetailsDate extends Component {
    state = {
        isDone: false,
    }

    handleChange = (ev) => {
        const { card, saveActivity } = this.props
        let checkStatus = ev.target.checked
        this.setState({ isDone: checkStatus })
        !ev.target.checked && saveActivity(card, 'INCOMPLETE_DUEDATE')
        ev.target.checked && saveActivity(card, 'COMPLETE_DUEDATE')
    }

    displayDueDate = () => {
        return <span>{(new Date(this.props.dueDate)).toString().split(' ')[1]
        + ' ' +
        (new Date(this.props.dueDate)).getUTCDate()+' at '+
        (new Date(this.props.dueDate)).toString().split(' ')[4].slice(0,5)
    }</span>
    }

    render() {
        // console.log(this.props);
        const { isDone } = this.state
        return (
            <div className="due-date-edit-preview">
                <h6>DUE DATE</h6>
                <div className="due-date-edit-preview-body">
                  
                    <Checkbox checked={isDone} onChange={this.handleChange} className="checkbox-todo" />
                    {this.displayDueDate()}
                    {isDone && <div className="completed">COMPLETED</div>}
                    {/* <button onClick={this.props.onToggle} >
                    <CardDateSetter
                          dueDate={this.props.card.dueDate}
                          onToggle={this.props.onToggleDueDateRight}
                          onUpdateCardProps={this.props.onUpdateCardProps}
                          card={this.props.card}
                        />
                    </button> */}
                </div>
            </div>
        )
    }
}
