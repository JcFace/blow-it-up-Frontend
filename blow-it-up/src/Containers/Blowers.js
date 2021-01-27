import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Blowers = ({blower, handleChosen}) => {
    return (

        <Card className='blower-card'>
            <Card.Img src={blower.img_url} alt='glass-blower' className='blower-image'/>
                <Card.Body>
                    <Card.Title>
                        {blower.full_name}
                    </Card.Title>
                    <Card.Text>
                        {blower.bio}
                    </Card.Text>
                    <Button onClick={() => handleChosen(blower)}>My Blows!</Button>
                </Card.Body>
        </Card>
    )
}

export default Blowers