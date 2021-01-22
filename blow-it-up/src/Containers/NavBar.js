import React from 'react'
import { Link } from 'react-router-dom'
// import './NavBar.css'

const NavBar = props => (
    <div className='navbar'>
            {
                props.user.username ?
                <>
                <div>
                    <Link className='link' to='/userprofile' onClick={() => props.handleHome(props.user)}>Home</Link>
                    <Link className='link' to='/logout' onClick={() => props.handleLogout()}>Logout</Link>
                    <Link className='link' to='/glassblowers'>Glass Blowers</Link>
                </div>
                </>
                :
                <>
                <div>
                <Link className='link' to='/signup'>Sign Up</Link>
                <Link className='link' to='/login'>Login</Link>
                </div>
                </>
            }
        {/* {props.name} */}
    </div>
);
export default NavBar;