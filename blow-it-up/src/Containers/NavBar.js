import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => (
    <div>
        <div>
            <Link to='/glassblowers' className='Blowers'>Glass Blowers</Link> 
            <br />
            <Link to='/signup'>Sign Up</Link>
            <br/>
            <Link to='/login'>Login</Link>
        </div>
        {/* {props.name} */}
    </div>
);
export default NavBar;