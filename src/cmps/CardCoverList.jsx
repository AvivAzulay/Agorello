import React, { Component } from 'react'



export class CardCoverList extends Component {
    state = {

    }



    componentDidMount() {

    }


    render() {
        return (
            <div className="card-label-list">
                <div className="card-label-list-header">
                    <p></p>
                    <h3>cover</h3>
                    <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-label"></button>
                </div>
                <input type="search" placeholder="Search labels" name="labelName"
                    value={this.state.labelName} onChange={this.handleChange} />
                <h4>Color</h4>
                {boardLabels.map(label => {
                    return <CardLabel key={label.id} boardLabel={label}
                        cardLabels={this.props.card.labels} toggleLabel={this.onClickBoardLabel} />
                })}
            </div>
        )

    }
}