import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/action/board.action.js'


class _BoardApp extends Component {

    state = {

    }

    componentDidMount() {
        this.props.loadBoard()
        console.log(this.state);
    }


    render() {

        return (
            <h1>Board</h1>
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

