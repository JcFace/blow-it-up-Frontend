import React, { Component } from 'react'
import Blowers from './Blowers'

class GlassBlowerContainer extends Component {
   
    render() {
        return (
            <div>
                <h1>Blowers</h1>

            <div className='blowers-container'>
                {
                    this.props.get.map(blower => <Blowers 
                        key={blower.id} 
                        blower={blower} 
                        handleChosen={this.props.handleChosen} />)
                    }
                    </div>
            </div>
        )
    }
}

export default GlassBlowerContainer