import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import FinishSignup from './Auth/FinishSignup'
import Form from './Auth/Form'
import NavBar from './Containers/NavBar'



class App extends Component {

  state = {
    user: null,
    token: '',
    selectedUser: '',
    blownArtPieces: [],
  }

  renderForms = (routerProps) => {
    console.log(routerProps)
    if (routerProps.location.pathname === '/signup'){
      return <Form name='Sign Up' handleSubmit={this.handleSignup} />
    } else if (routerProps.location.pathname === '/login'){
      // console.log("logging in")
      return <Form name='Login' handleSubmit={this.handleLogin} />
    }
  }

  handleLogin = (info) => {

  }

  handleSignup = (info) => {
    console.log(info)
    this.handleAuthFetch(info, 'http://localhost:3000/users')
  }

  handleAuthFetch = (info, request) => {
    fetch(request, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({user: data}, () => {
        this.props.history.push('/finishsignup')
      })
    })
  }

  render(){
    return (
      <div className='app'>
        <NavBar />
        
        <Switch>
          <Route path='/login' exact component={this.renderForms} />
          <Route path='/signup' exact component={this.renderForms} />
          <Route path='/finishsignup' render={() => <FinishSignup name='Finish Sign Up!'/>}/>
          {/* <Form /> */}

        </Switch>
        

      </div>
    )
  }
}

export default withRouter(App);
