import React from 'react';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


class LoginForm extends React.Component {
   state = {
       email: "",
       password: ""
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



    render(){
        return (
            <Form className='login-form' onSubmit={this.handleSubmit}>
            <h1>{this.props.name}</h1>
            <Form.Group>
            <Form.Control type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email'/>
            </Form.Group>
            <Form.Group>

            <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/><br/>
            </Form.Group>
            <Button type='submit' value='Submit'>Submit</Button>

            </Form>
        )
    }
}

export default LoginForm;