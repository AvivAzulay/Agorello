import React, { Component } from 'react'
import { connect } from 'react-redux'


class _BoardApp extends Component {

    state = {

    }

    componentDidMount() {

    }


    render() {

        return (
            <h1>Board</h1>
        )
    }
}



function mapStateToProps() {
    return {

    }
}
const mapDispatchToProps = {

}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

