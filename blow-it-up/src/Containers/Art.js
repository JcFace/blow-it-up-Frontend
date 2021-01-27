import React from 'react'
import { Card, Button } from 'react-bootstrap'
// import FruitBowl from '../ArtImages/FruitBowl.jpeg'

const Art = props => {

    var fave = props.favorites.find(favorite => favorite.art_piece_id === props.art.id)
    
    return (
        <div >
            <Card className='mb-3'>
              <Card.Body>

                <Card.Img src={props.art.img_url} alt='fruitbowl-pic' style={{maxWidth: '50%'}}/>
                <Card.Title>
                    Name: {props.art.name} 
                </Card.Title>
                    <Card.Text>
                        Description: {props.art.description}
                    </Card.Text>
                            {
                             fave ?
                                <Button 
                                    onClick={() => props.handleUnfavorite(props.current.id, props.art.id)} 
                                    className='favorite-button'>
                                    Unfavorite
                                </Button>
                                        :
                                    <Button 
                                    onClick={() => props.handleFavorite(props.current.id, props.art.id)} 
                                    className='favorite-button'>
                                     Favorite
                                    </Button>
                            }
                       
              </Card.Body>
            </Card>
        </div>
    )
}

export default Art