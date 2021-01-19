import React from 'react';

class Form extends React.Component {
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
            <form onSubmit={this.handleSubmit}>
            <h1>{this.props.name}</h1>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
            <input type='submit' value='Submit'/>
            </form>
        )
    }
}

export default Form;