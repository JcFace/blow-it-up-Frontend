import React from 'react';
import { Form, Button } from 'react-bootstrap'


class FinishSignup extends React.Component {

    state = {
        user: this.props.user,
        full_name: this.props.user.full_name,
        is_client: true,
        bio: this.props.user.bio,
        img_url: this.props.user.img_url,
        username: this.props.user.username
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleIsClient = (e) => {
        let {value} = e.target
        console.log(value)
        if (value === 'yes'){
            this.setState({
                is_client: false
            })
        }
        else {
            this.setState({
                is_client: true
            })
        }
        

    }

    render(){
        return (
          
            <Form onSubmit={this.handleSubmit} className='user-info-form'>
                <Form.Group>
                    <h1>{this.props.name}</h1>
                    


                    {/* So that you can sign up as a glass blower. 
                    Couldn't hack it for the project but will continue to build out after. 
                    
                    
                    <Form.Label>Are you a Glass Blower? <br/>
                        Yes 
                    <Form.Control
                        as='input'
                        type='radio'
                        value='yes'
                        checked={this.state.is_client === false}
                        onChange={this.handleIsClient}/>
                    </Form.Label><br/>
                         No 
                    <Form.Control 
                        as='input'
                        type='radio'
                        value='no'
                        checked={this.state.is_client === true}
                        onChange={this.handleIsClient}/><br/> */}


            
                    <Form.Label>Full Name: </Form.Label><br/>
                    <Form.Control 
                        type='text' 
                        name='full_name'
                        // defaultValue={this.props.user.full_name}
                        value={this.state.full_name} 
                        onChange={this.handleChange}/><br />
                    <Form.Label>Username: </Form.Label><br/>
                    <Form.Control 
                        as='input' 
                        name='username'
                        value={this.state.username} 
                        onChange={this.handleChange}/><br />
                    <Form.Label>Image Url: </Form.Label><br/>
                    <Form.Control 
                        type='text' 
                        name='img_url'
                        value={this.state.img_url} 
                        onChange={this.handleChange}/><br />
                    <Form.Label>Bio: </Form.Label> <br />
                    <Form.Control
                        as='textarea'
                        name='bio'
                        value={this.state.bio}
                        onChange={this.handleChange}
                        rows={8}
                        cols={10}
                        />
                    <Button type='submit' value='Submit'>Submit</Button>
                </Form.Group>
                    </Form>
        )
    }
}

export default FinishSignup;