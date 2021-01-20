import React from 'react';

class FinishSignup extends React.Component {

    state = {
        user: this.props.user,
        full_name: '',
        is_client: true,
        bio: '',
        img_url: '',
        username: ''
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
          
            <form onSubmit={this.handleSubmit}>
            <h1>{this.props.name}</h1>
            <label>Are you a Glass Blower? <br/>
            <input 
            type='radio'
            value='yes'
            checked={this.state.is_client === false}
            onChange={this.handleIsClient}/>
            Yes 
            </label>
            <label>
            <input 
            type='radio'
            value='no'
            checked={this.state.is_client === true}
            onChange={this.handleIsClient}/>
            No 
            </label><br/>
            <label>Full Name: </label><br/>
            <input 
            type='text' 
            name='full_name'
            value={this.state.full_name} 
            onChange={this.handleChange}/><br />
            <label>Username: </label><br/>
            <input 
            type='text' 
            name='username'
            value={this.state.username} 
            onChange={this.handleChange}/><br />
            <label>Image Url: </label><br/>
            <input 
            type='text' 
            name='img_url'
            value={this.state.img_url} 
            onChange={this.handleChange}/><br />
            <label>Bio: </label> <br />
            <textarea
            type='textarea'
            name='bio'
            value={this.state.bio}
            onChange={this.handleChange}
            rows={8}
            cols={30}/>
            <input type='submit' value='Submit'/>
            </form>
        )
    }
}

export default FinishSignup;