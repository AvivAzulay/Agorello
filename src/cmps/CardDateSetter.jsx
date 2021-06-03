import React from 'react'
import TextField from "@material-ui/core/TextField"

export function CardDateSetter({ onUpdateCardProps }) {

    function handleChange(ev) {
        const { value } = ev.target
        const dueDate = {}
        dueDate.time = value
        dueDate.isCompleted = false
        onUpdateCardProps('dueDate', dueDate)
    }

    return (
        <div>
            < form noValidate>
                <TextField
                    onChange={handleChange}
                    onBlur={handleChange}
                    id="datetime-local"
                    label="Due date"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: false,
                        required: false,
                        fullWidth: true
                    }}
                />
            </form>
        </div >

    )
}