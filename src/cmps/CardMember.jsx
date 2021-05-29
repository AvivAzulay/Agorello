import { Component } from 'react'

export class CardMember extends Component {
    state = {
        isChecked: null
    }

    componentDidMount() {
        this.init()
    }

    init() {
        const splitedName = this.props.boardMember.fullname.split(' ')
        let initials = splitedName.map(name => name[0])
        initials = initials.slice(0, 2)
        console.log(this.props.cardMembers)
        let isChecked = false
        if (this.props.cardMembers.length) {
            isChecked = Boolean(this.props.cardMembers.find(member => member._id === this.props.boardMember._id))
        }
        this.setState({isChecked})
    }

    onToggleState() {
        this.props.toggleMember(this.props.boardMember, this.state.isChecked)
        this.setState({isChecked: !this.state.isChecked})
    }

    render() {
        return (
            <div className="board-member" onClick={this.onToggleState}>
                <div>
                    - {this.initials} -
                    {this.props.boardMember.fullname}
                    {this.state.isChecked ? '✔' : ''}
                </div>
            </div>
        )
    }
}