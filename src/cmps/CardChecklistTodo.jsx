
import { Button, Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { utilService } from '../services/util-service'
// import { DeleteOutlineOutlinedIcon } from '@material-ui/icons/DeleteOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export class CardChecklistTodo extends Component {

    state = {
        isDone: false,
        isEditing: false,
        txtValue: '',
        // isNew: false,
        todo: null
    }

    componentDidMount() {
        // if (this.props.isNew) this.setState({ isNew: true })
        this.updateTodo()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.txtValue !== this.state.txtValue || prevState.isDone !== this.state.isDone) this.updateChecklist(this.state.checklist)
    }

    handleChange = (ev) => {
        ev.stopPropagation()
        this.setState({ isDone: ev.target.checked }, () => {
            ////HEREHEREHERE///
            // console.log(this.state.txtValue);
            // console.log(ev.target.checked);
            const card = { ...this.props.card }
            card.txtValue = this.state.txtValue
            ev.target.checked && this.props.saveActivity(card, 'COMPLETE_TASK')
            !ev.target.checked && this.props.saveActivity(card, 'INCOMPLETE_TASK')
        })
    }

    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    removeText = () => {
        this.setState({ txtValue: '' })
    }

    getTodoClassName = () => {
        const doneClass = (this.state.isDone) ? 'todo-done' : 'todo-not-done'
        return `checklist-todo-title ${doneClass}`
    }

    getTextBox = () => {
        if (this.state.isEditing) return (
            <React.Fragment>
                <Checkbox color="primary" checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                <form onBlur={this.toggleEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                <div className={this.getTodoClassName()} onClick={this.toggleEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                        {/* <DeleteOutlineOutlinedIcon fontSize="inherit" /> */}
                        {/* <DeleteOutlineOutlinedIcon /> */}
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        // this.setNotEditing()
        this.updateChecklist()
    }

    updateTodo = () => {

        const todo = this.props.todo
        if (!todo) return
        const txtValue = todo.title
        const isDone = todo.isDone

        this.setState({ ...this.state, isDone, txtValue })
    }

    onChange = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: ev.target.value })
    }

    getActivityTxt = () => {
        let txt;
        if (this.state.isDone) {
            txt = `completed ${this.state.txtValue}`
        } else {
            txt = `marked ${this.state.txtValue} incomplete`
        }
        return txt
    }

    onRemove = (ev) => {
        // ev.stopPropagation()
        // console.log(this.props.todo);
        // console.log(ev);
        this.props.todo.title = ''
        this.props.onUpdateChecklist(this.props.todo)
        // this.setState({ txtValue: '' }, this.updateChecklist)
    }

    updateChecklist = () => {

        let id;
        if (this.props.todo) {
            id = this.props.todo.id
        } else {
            id = utilService.makeId()
        }
        const todo = {
            id,
            isDone: this.state.isDone,
            title: this.state.txtValue
        }

        this.props.onUpdateChecklist(todo)
        // const activityTxt = this.getActivityTxt()
        // if (this.state.isNew) {
        //     this.props.onUpdate(todo)
        //     this.setState({ txtValue: '' })
        // } else {
        //     this.props.onUpdate(todo, activityTxt)
        // }
    }


    render() {
        if (!this.props.displayCompleted && this.state.isDone) return <React.Fragment />

        if (this.state.isEditing) return (
            <div className="checklist-todo flex">
                <Checkbox checked={this.state.isDone} className="checkbox-todo" />
                <form onBlur={this.toggleEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
                {/* { this.getNewTodoDisplay()} */}
            </div>
        )
        return (
            <div className="checklist-todo flex">
                <Checkbox checked={this.state.isDone} onChange={this.handleChange} className="checkbox-todo" />
                <div className={this.getTodoClassName()} onClick={this.toggleEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                    </Button>
                </div>
            </div>
        )


    }
}
