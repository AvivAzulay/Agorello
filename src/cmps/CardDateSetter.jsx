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
    }

    toggleDateModal = () => {
        this.setState({ isDateOpen: !this.state.isDateOpen })
    }

    render() {
        const { isDateOpen } = this.state
        return (
            <div>
                <button className="edit-add-to-card-dates" onClick={this.toggleDateModal}> Dates</button>
                { isDateOpen &&

                    < form noValidate>
                        <TextField
                            id="datetime-local"
                            label="Due date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
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
