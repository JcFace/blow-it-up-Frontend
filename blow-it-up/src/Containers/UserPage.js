import React from 'react'
import Map from '../GoogleMap/Map'
import Art from './Art'
import UserCard from '../Containers/UserCard'
import FavoritesContainer from '../Containers/FavoritesContainer'
import { Container, Card } from "react-bootstrap";

const UserPage = ({selected, arts, current, handleFavorite, favorites, handleUnfavorite, handleUpdate }) => {
        if (selected != null){
            return  <Container className='glass-blower-container'>
                        <Card>
                            <Card.Title className='glass-blower'>
                                <h1>Blown by:</h1><br/> <h1>{selected.full_name}</h1>
                            </Card.Title>
                                <Card.Body>
                                    {
                                        arts.map(a => {
                                        if (a.creator_name === selected.full_name)
                                            return <Art current={current} 
                                                        handleFavorite={handleFavorite} 
                                                        favorites={favorites} 
                                                        key={a.id} 
                                                        art={a}
                                                        handleUnfavorite={handleUnfavorite}
                                                        />
                                                     })
                                    }
                                </Card.Body>
                            </Card>
                        <div className='map-container' >
                            <Map className='google-map'  selected={selected}/>
                        </div>
                   </Container>
            }
         else if (current.is_client === false){
                return <div className='userpage'>
                            <h1>Welcome {current.full_name}!</h1>
                            <h3>Your Blows</h3>
                        {
                            arts.map(a => {
                            if (a.creator_name === current.full_name)
                            return <Art key={a.id} art={a} favorites={favorites}/>
                        })
                    }
                    <FavoritesContainer current={current} favorites={favorites} />
                         </div>
            }
        else {
            return <Container className='userpage'>
                        <div className='usercard-container'>
                            <h1>Welcome {current.username}!</h1>
                            <UserCard user={current} handleUpdate={handleUpdate} />
                        </div>
                            <div className='favorite-container'>
                                <FavoritesContainer current={current} favorites={favorites} />
                            </div>
                   </Container>
           }
             
    }
    

export default UserPage