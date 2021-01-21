import React from 'react'

const Blowers = (props) => {
    return (
        <div onClick={() => props.handleChosen(props.blower)} >
            <h3>{props.blower.full_name}</h3>
            <div>
                {props.blower.img_url}
            </div>
        </div>
    )
}

export default Blowers