import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField"
import { Popover } from "@material-ui/core"
import DesktopDatePicker from '@material-ui/pickers'
// import { makeStyles } from '@material-ui/core/styles'
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
// import DateTimePicker from '@material-ui/lab/DateTimePicker'

export class CardDateSetter extends Component {

    state = {
        isDateOpen: false,
        dueDate: ''
    }


    componentDidMount() {
       
      console.log( this.props.card)

    }

    toggleDateModal = () => {
        this.setState({ isDateOpen: !this.state.isDateOpen })
    }


    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ ...this.state, dueDate: value} ,()=>this.props.onUpdateCardProps('dueDate',this.state.dueDate))
    }




    render() {
        const { isDateOpen } = this.state
        return (
            <div>
                <button className="edit-add-to-card-dates" onClick={this.toggleDateModal}> Dates</button>
                { isDateOpen &&

                    < form noValidate>
                        <TextField
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            id="datetime-local"
                            label="Due date"
                            type="datetime-local"
                            defaultValue="2021-06-01T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                }
            </div >
        )
    }
}
