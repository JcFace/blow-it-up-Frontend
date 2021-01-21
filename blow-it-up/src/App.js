import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import FinishSignup from './Auth/FinishSignup'
import Form from './Auth/Form'
import NavBar from './Containers/NavBar'
import GlassBlowerContainer from './Containers/GlassBlowerContainer'
import UserPage from './Containers/UserPage'

const Url = 'http://localhost:3000/users'

class App extends Component {

  state = {
    user: {
      id: '',
      username: '',
      full_name: '',
      img_url: ''
    },
    token: '',
    blowers: [],
    selectedBlower: null,
    favoritePieces: [],
  }

// Grab the Glass Blowers
  componentDidMount() {
    this.reAuth()
    fetch(Url)
    .then(res => res.json())
    .then(blowers => {
      console.log(blowers)
      this.setState({
        blowers: blowers
      })
    })
  }

  // render components
  renderBlowers = () => <GlassBlowerContainer get={this.getBlowers()} handleChosen={this.handleChosen}/>
  goToUser = () => <UserPage user={this.state.user} />
  renderFinishSignup = () => <FinishSignup user={this.state.user} name='Finish Sign Up!' handleSubmit={this.finishSignupSubmit} />
  getBlowers = () => {
    return this.state.blowers
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

  
  // Auth
  handleSignup = (info) => {
    // console.log(info)
    this.handleAuthFetch(info, Url)
  }
  finishSignupSubmit = (info) => {
    console.log(info.user.user.id)
    let userId = info.user.user.id
    this.handleSignupFetch(info, `http://localhost:3000/users/${userId}`)
  }
  
  handleLogin = (info) => {
    // console.log(info)
    this.handleLoginFetch(info, 'http://localhost:3000/login')
  }
  
  handleLogout = () => {
    localStorage.clear()
    this.setState({user: null}, () => {
      this.props.history.push('/login')
    })
  }

  // Auth Fetch
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
      this.setState({user: data.user, token: data.token}, () => {
        localStorage.setItem('token', data.token)
        this.props.history.push('/finishsignup')
      })
    })
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
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(signupData)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({user: data.user}, () => {
        this.props.history.push('/userprofile')
      })
    })
    .catch(errors => console.log(errors))
  }
  
  handleLoginFetch = (info, request) => {
    fetch(request, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error)
      console.log(data)
      else
      this.setState({user: data.user, token: data.token}, () => {
        localStorage.setItem('token', data.token)
        this.props.history.push('/userprofile')
      })
    })
  }
  
  reAuth = () => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/profile', {
        method: 'GET', 
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({
        user: data.user
      }))
      
    }
  }
  
  handleChosen = (blower) => {
    this.setState({
      selectedBlower: blower
    }, console.log(blower))
   return <Redirect chosen={this.state.selectedBlower} to='/blower'/>
  }
  


  render(){
    return (
      <div className='app'>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        
        <Switch>
          <Route path='/glassblowers' exact component={this.renderBlowers} />
          <Route path='/login' exact component={this.renderForms} />
          <Route path='/signup' exact component={this.renderForms} />
          <Route path='/finishsignup' exact component={this.renderFinishSignup} />
          <Route path='/userprofile' exact component={this.goToUser} />
          {/* <Route path='/' exact component={this.renderForms} /> */}
          {/* <Form /> */}

        </Switch>
        

      </div>
    )
  }
}

export default withRouter(App);
