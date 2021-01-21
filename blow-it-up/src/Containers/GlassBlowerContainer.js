import React, { Component } from 'react'
import Blowers from './Blowers'

class GlassBlowerContainer extends Component {
    state = {
        selectedBlower: null
    }

    render() {
        return (
            <div className='blowers-container'>
                <h1>Glass Blowers Page</h1>
                {
                    this.props.get.map(blower => <Blowers id={blower.id} blower={blower} handleChosen={this.props.handleChosen} />)
                }
            </div>
        )
    }
}

export default GlassBlowerContainer