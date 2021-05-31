import React, { Component } from 'react'

import { CardLabel } from './CardLabel'

export class CardLabelList extends Component {
    state = {
        labelName: '',
        boardLabels: []
    }

    // inputRef = React.createRef()

    componentDidMount() {
        this.setState({ boardLabels: this.props.boardLabels })
        // this.inputRef.current.focus()
    }

    onClickBoardLabel = (label, isChecked) => {
        // let txt = '' // for actions
        let labels = this.props.card.labels
        if (!labels) labels = []
        if (!isChecked) {
            labels.push(label)
            // txt = `added ${label.txt}`
        } else {
            labels = labels.filter(cardlabel => cardlabel.id !== label.id)
            // txt = `removed ${label.txt}`
        }
        this.props.onUpdateCardProps('labels', labels)
    }

    handleChange = (ev) => {
        this.setState({ labelName: ev.target.value })
    }

    render() {
        let { boardLabels } = this.state
        if (!boardLabels || boardLabels.length === 0) return <h1>Loading...</h1>
        boardLabels = boardLabels.filter(label => label.name.toLowerCase().includes(this.state.labelName.toLowerCase()))
        return (
            <div className="card-label-list">
                <h3>Labels</h3>
                <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-label"></button>
                <input type="search" placeholder="Search labels" name="labelName"
                    value={this.state.labelName} onChange={this.handleChange} />
                <h4>LABELS</h4>
                {boardLabels.map(label => {
                    return <CardLabel key={label.id} boardLabel={label}
                        cardLabels={this.props.card.labels} toggleLabel={this.onClickBoardLabel} />
                })}
            </div>
        )

    }
}