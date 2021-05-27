import React, { Component } from 'react'

export class CardAdd extends Component {

    state = {
        isEditing: false,
        card: {
            title: ''
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
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
        this.setState({ ...this.state, card: { title: value } })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.onSaveCard(this.state.card, this.props.groupId)
        this.setState({ ...this.state, card: { title: '' } })
    }

    render() {
        const { isEditing, card: { title } } = this.state
        return (<React.Fragment>

            { !isEditing &&
                <div className="card-add-edit" >
                    <p className="card-add-txt" onClick={this.onToggleMode}>Add another card</p>
                </div>}

            {isEditing &&
                <div className="card-add-edit" >
                    <form action="">
<<<<<<< HEAD
                        <input type="text" ref={this.inputRef} value={title} onChange={this.handleChange} placeholder="Enter a title for this card..." />
                        <button onClick={this.onSubmit}>Add card</button>
                        <button onClick={this.onToggleMode}>&times;</button>
                        <button onClick={() => { }}>...menu</button>
=======
                        <textarea type="text" ref={this.inputRef} value={title} placeholder='Enter a title for this card...' onChange={this.handleChange} />
                        <div className="card-add-btn" >
                            <span className="left-btn">
                                <button className="card-add-edit-btn" onClick={this.onSubmit}>Add card</button>
                                <button className="card-add-exit-btn" onClick={this.onToggleMode}></button>
                            </span>
                            <button className="card-add-menu-btn" onClick={() => { }}></button>
                        </div>

>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
                    </form>
                </div>}

        </React.Fragment>
        )
    }
}