import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => (
    <div>
            {
                props.user === null ?
                <>
                <div>
                <Link to='/signup'>Sign Up</Link>
                <br/>
                <Link to='/login'>Login</Link>
                </div>
                </>
                :
                <div>
                <>
                <Link to='/logout' onClick={() => props.handleLogout()}>Logout</Link><br/>
                <Link to='/glassblowers' className='Blowers'>Glass Blowers</Link> 
                <br />
                </>
            </div>
            }
        {/* {props.name} */}
    </div>
);
export default NavBar;