import React from "react";
import { Card } from "react-bootstrap";

const Favorite = ({fave}) => {
    return (
        <div className='favorite'>
            <Card className='favorite-card'>
                <Card.Img src={fave.art_piece.img_url} alt='favorite' style={{maxWidth: '50%'}} />
                    <Card.Title>
                        {fave.art_piece.name}
                    </Card.Title>
                    <Card.Text>
                        {fave.art_piece.description}
                    </Card.Text>
            </Card>
        </div>
    )
}

export default Favorite