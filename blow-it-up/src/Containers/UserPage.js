import React from 'react'

const UserPage = (props) => {

           return(
               <div>
                    <h1>Welcome {props.user.full_name}!</h1>
                </div>
             ) 
    }
               // {this.props.user.full_name}

export default UserPage