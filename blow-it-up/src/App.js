import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import FinishSignup from './Auth/FinishSignup'
import Form from './Auth/Form'
import NavBar from './Containers/NavBar'
import GlassBlowers from './Containers/GlassBlowers'
import Home from './Containers/Home'



class App extends Component {

  state = {
    user: null,
    token: '',
    selectedUser: '',
    blownArtPieces: [],
  }

  // render components
  goHome = () => <Home user={this.state.user} />
  renderFinishSignup = () => <FinishSignup user={this.state.user} name='Finish Sign Up!' handleSubmit={this.finishSignupSubmit} />
  renderForms = (routerProps) => {
    console.log(routerProps)
    if (routerProps.location.pathname === '/signup'){
      return <Form name='Sign Up' handleSubmit={this.handleSignup} />
    } else if (routerProps.location.pathname === '/login'){
      // console.log("logging in")
      return <Form name='Login' handleSubmit={this.handleLogin} />
    }
  }

// Authorization
  handleLogin = (info) => {
    console.log(info)
    this.handleAuthFetch(info, 'http://localhost:3000/login')
  }
// Signup part 1
  handleSignup = (info) => {
    // console.log(info)
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

 // Signup part 2
  finishSignupSubmit = (info) => {
    console.log(info.user.user.id)
    let userId = info.user.user.id
    this.handleSignupFetch(info, `http://localhost:3000/users/${userId}`)
  }

  handleSignupFetch = (info, request) => {
    const token = localStorage.getItem('token')
    let signupData = {
      id: info.id,
      full_name: info.full_name,
      is_client: info.is_client,
      bio: info.bio,
      img_url: info.img_url,
      username: info.username
    }
    fetch(request, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer${token}`
      },
      body: JSON.stringify(signupData)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({user: data}, () => {
        this.props.history.push('/')
      })
    })
    .catch(errors => console.log(errors))
  }

  render(){
    return (
      <div className='app'>
        <NavBar />
        
        <Switch>
          <Route path='/glassblowers' exact component={this.renderBlowers} />
          <Route path='/login' exact component={this.renderForms} />
          <Route path='/signup' exact component={this.renderForms} />
          <Route path='/finishsignup' exact component={this.renderFinishSignup} />
          <Route path='/' exact component={this.goHome} />
          {/* <Form /> */}

        </Switch>
        

      </div>
    )
  }
}

export default withRouter(App);
