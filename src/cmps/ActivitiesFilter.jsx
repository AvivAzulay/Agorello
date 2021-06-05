
import React from 'react';

export class ActivitiesFilter extends React.Component {

    state = {
        filterBy: {
            searchTxt: '',

        }
    }

    handleChange = ({ target }) => {
        const { value, name: field } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }



    render() {

        const { searchTxt } = this.state
        return (
            <section className="borad-filter-container">
                <input type="search" id="standard-basic" name="searchTxt" value={searchTxt} placeholder="Search Activities..." onChange={this.handleChange} />
            </section>
        )
    }

}