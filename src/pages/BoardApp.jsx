import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoradNav } from '../cmps/BoradNav.jsx'
import { loadBoard } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'

class _BoardApp extends Component {

    state = {

    }

    componentDidMount() {
        this.props.loadBoard()
        console.log(this.props.board);
    }



    render() {
        if (!this.props.board) return <div>Loading...</div>
        return (
            <section className="board">
                <BoradNav />
                <h1>Board</h1>
                <GroupList groups={this.props.board.groups} />
            </section>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    loadBoard
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

