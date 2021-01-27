import React from 'react'
import { Card, Button } from 'react-bootstrap'

const UserCard = ({user, handleUpdate}) => {
    return (
        <div>
            <Card className='usercard'>
                <Card.Img src={user.img_url} />
                <Card.Body>
                    <Card.Title>
                        {user.full_name}
                    </Card.Title>
                    <Card.Text>
                        Bio: {user.bio}
                    </Card.Text>
                    <Button variant='primary' onClick={() => handleUpdate(user)}>Update</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard