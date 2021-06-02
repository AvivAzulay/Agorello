import React, { Component } from 'react'
import { Checkbox } from '@material-ui/core'

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
        return <h5>{this.props.dueDate}</h5>
    }

    render() {
        // console.log(this.props);
        const { isDone } = this.state
        return (
            <div >
                <h6>DUE DATE</h6>
                <div className="flex">
                    <Checkbox checked={isDone} onChange={this.handleChange} className="checkbox-todo" />
                    {this.displayDueDate()}
                    {isDone && <div>COMPLETED</div>}
                    <button onClick={this.props.onToggle} style={{ border: " 1px solid black" }}>^</button>
                </div>
            </div>
        )
    }
}
