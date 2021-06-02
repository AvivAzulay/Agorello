import React from 'react'
import TextField from "@material-ui/core/TextField"

// import React from 'react'

export function CardDateSetter({ onUpdateCardProps }) {

    function handleChange(ev) {
        const { value } = ev.target
        onUpdateCardProps('dueDate', value)
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
                    defaultValue="2021-06-01T10:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </div >

    )
}