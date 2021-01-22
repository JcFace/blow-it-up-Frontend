import React from 'react'
import Map from './GoogleMap/Map'
import Art from './Art'

const UserPage = ({selected, arts, current}) => {

           if (selected != null){
           return  <div className='glass-blower'>
                    <h1>{selected.full_name}'s Page</h1>
                    <h3>Arts by {selected.full_name}</h3>
                    {
                        arts.map(a => {
                            if (a.creator_name === selected.full_name)
                            return <Art id={a.id} art={a}/>
                        })
                    }
                    <Map />
                   </div>
            }
            if (current.is_client === false){
                return <div className='userpage'>
                <h1>Welcome {current.full_name}!</h1>
                <h3>Your Arts</h3>
                {
                    arts.map(a => {
                        if (a.creator_name === current.full_name)
                        return <Art id={a.id} art={a}/>
                    })
                }
               </div>
            }
           else {
            return <div className='userpage'>
                    <h1>Welcome {current.full_name}!</h1>
                   </div>
           }
             
    }
               // {this.props.user.full_name}

export default UserPage