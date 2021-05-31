import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField"
import { Popover } from "@material-ui/core"
import { DesktopDatePicker } from "@material-ui/pickers"

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
                    <div>
                        <DesktopDatePicker
                            label="For desktop"
                            value={value}
                            minDate={new Date("2017-01-01")}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(props) => <TextField {...props} />}
                        />
                    </div>}
            </div>
        )
    }
}
