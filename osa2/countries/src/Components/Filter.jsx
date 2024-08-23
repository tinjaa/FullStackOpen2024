import React from 'react'

const Filter = (props) => {
    const {filterChange} = props
    return (
        <form>
            <div>
                find countries
                <input
                    onChange={filterChange}
                />
            </div>
        </form>
    )
}

export default Filter