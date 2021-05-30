import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { CardChecklistTodo } from './CardChecklistTodo'
import React, { Component } from 'react'
// import { boardAction } from '../store/action/board.action'

export class CardCheckList extends Component {

    state = {
        tasksCompleted: 0,
        totalTasks: 0,
        displayCompleted: true,
        showDialog: false,
        checklist: null
    }


    componentDidMount() {
        this.setTasksStatus()
        this.setState({ checklist: this.props.checklist })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.list !== prevProps.checklist) this.setTasksStatus()
    // }

    setTasksStatus = () => {
        let tasksCompleted = 0
        let totalTasks = 0

        this.props.list.todos.forEach(todo => {
            if (todo.isDone) tasksCompleted += 1
            totalTasks += 1
        });

        this.setState({ tasksCompleted, totalTasks })
    }

    toggleDisplayCompleted = () => {
        if (this.state.displayCompleted) return this.setState({ displayCompleted: false })
        return this.setState({ displayCompleted: true })
    }

    getDisplayCheckedBtn = () => {
        if (!this.state.tasksCompleted) return <React.Fragment />
        let btnContent;
        if (this.state.displayCompleted) {
            btnContent = 'Hide Completed Items'
        } else {
            btnContent = `Show Checked Items (${this.state.tasksCompleted})`
        }
        return (
            <Button onClick={this.toggleDisplayCompleted}>{btnContent}</Button>
        )
    }

    openDialog = () => {
        this.setState({ showDialog: true })
    }

    closeDialog = () => {
        this.setState({ showDialog: false })
    }

    getPrecentegesCompleted = () => {
        const percent = Math.round((this.state.tasksCompleted / this.state.totalTasks) * 100)
        return percent
    }

    onUpdateChecklist = (newTodo) => {
        // take the updated todo and insert it into the list
        let todos = [...this.props.list.todos]
        // find the todo index
        const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
        // if new title is blank - remove todo
        if (!newTodo.title) {
            todos.splice(todoIdx, 1)
        } else if (todoIdx < 0) { //if the index is less than 0 - this is a new item
            todos.unshift(newTodo)
        } else {
            todos[todoIdx] = newTodo
        }
        const checklist = { ...this.props.list }
        checklist.todos = todos
        this.props.onUpdateCardProps('checklist', checklist)
    }

    onRemoveChecklist = () => {
        const { checklist } = this.state
        const { list } = this.props
        const checklistIdx = checklist.findIndex(currList => currList.id === list.id)
        checklist.splice(checklistIdx, 1)
        this.props.onUpdateCardProps('checklist', checklist)
        this.closeDialog()
        // let activityTxt = `removed ${this.props.list.title}`
    }

    render() {
        const { list } = this.props
        return (
            <div className="checklist">

                {/* Adding liner bar brogress! */}
                {((this.state.totalTasks) ? (
                    <div className="checklist-progress">
                        <div className="checklist-progress-numbers">%{this.getPrecentegesCompleted()}</div>
                        <LinearProgress value={this.getPrecentegesCompleted()} variant="determinate" />
                    </div>
                ) : <React.Fragment />)
                }

                {/* Check list + input + delete btn! */}
                <div className="checklist-title-container flex">
                    <CheckBoxOutlinedIcon />
                    <div className="checklist-title">title: {list.title}</div>
                    <div className="checklist-title-btns">
                        {this.getDisplayCheckedBtn()}
                        <button style={{ border: "1px black solid" }} onClick={this.openDialog}>Remove</button>
                    </div>
                </div>

                <main className="checklist-main">
                    {this.props.list.todos.map(todo => <CardChecklistTodo key={todo.id} displayCompleted={this.state.displayCompleted} todo={todo} onUpdateChecklist={this.onUpdateChecklist} />)}
                    {/* <CardChecklistTodo isNew={true} onUpdate={this.onUpdateChecklist} /> */}
                </main>



                <Dialog onClose={this.closeDialog} open={this.state.showDialog}>
                    <DialogTitle id="alert-dialog-title">{"Remove this checklist?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a checklist is permanent and there is no way to get it back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.onRemoveChecklist} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                {/*
               */}
            </div>
        )
    }
}
