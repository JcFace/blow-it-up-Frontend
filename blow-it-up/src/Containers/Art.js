import React from 'react'

const Art = props => {
    return (
        <div >
            <h3>Name: {props.art.name}</h3>
            <div>
                Description: {props.art.description}
            </div>
        </div>
    )
}

export default Art