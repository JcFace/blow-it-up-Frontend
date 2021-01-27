import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import FinishSignup from './Auth/FinishSignup'
import LoginForm from './Auth/LoginForm'
import NavBar from './Containers/NavBar'
import './App.css'
import GlassBlowerContainer from './Containers/GlassBlowerContainer'
import UserPage from './Containers/UserPage'


const Url = 'http://localhost:3000/users'

class App extends Component {

  state = {
    user: {
      id: '',
      username: null,
      full_name: '',
      img_url: '',
      lat: '',
      lng: ''
    },
    token: '',
    blowers: [],
    arts: [],
    selectedBlower: null,
    selectedArt: null,
    favorites: [],
    currentUser: {}
  }

// Grab the Glass Blowers & art_pieces
  componentDidMount() {
    this.loadFavorites()
    this.getArts()
    this.reAuth()
    fetch(Url)
    .then(res => res.json())
    .then(blowers => {
      this.setState({
        blowers: blowers
      })
    })
  }

  getArts = () => {
    fetch('http://localhost:3000/art_pieces')
    .then(res => res.json())
    .then(arts => {
      this.setState({
        arts: arts
      })
    })
  }

  // Render components
  renderBlowers = () => <GlassBlowerContainer get={this.getBlowers()} handleChosen={this.handleChosen}/>
  renderFinishSignup = () => <FinishSignup user={this.state.user} name='Finish Sign Up!' handleSubmit={this.finishSignupSubmit} />
  renderUpdateForm = () => <FinishSignup user={this.state.user} name='Update Profile!' handleSubmit={this.finishSignupSubmit} />
  getBlowers = () => {
    return this.state.blowers
  }
  goToUser = () => {
  return <UserPage 
  handleHome={this.handleHome}
  current={this.state.currentUser} 
  selected={this.state.selectedBlower} 
  user={this.state.user}
  arts={this.state.arts} 
  favorites={this.state.favorites}
  handleFavorite={this.handleFavorite}
  handleUnfavorite={this.handleUnfavorite}
  handleUpdate={this.handleUpdate} />
  }
  
  renderForms = (routerProps) => {
    if (routerProps.location.pathname === '/signup'){
      return <LoginForm name='Sign Up' handleSubmit={this.handleSignup} />
    } else if (routerProps.location.pathname === '/login'){
      // console.log("logging in")
      return <LoginForm name='Login' handleSubmit={this.handleLogin} />
    }
  }

  
  // Auth
  handleSignup = (info) => {
    this.handleAuthFetch(info, 'http://localhost:3000/users')
  }
  finishSignupSubmit = (info) => {
    let userId = info.user.id
    this.handleSignupFetch(info, `http://localhost:3000/users/${userId}`)
  }
  
  handleLogin = (info) => {
    // console.log(info)
    this.handleLoginFetch(info, 'http://localhost:3000/login')
  }
  
  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ''}, () => {
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
      this.setState({
        user: data.user, 
        token: data.token,
        currentUser: data.user
      }, () => {
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
      this.setState({
        user: data.user,
        token: data.token,
        currentUser: data.user
      }, () => {
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
      console.log(info)
      this.setState({
        user: data.user,
        currentUser: data.user
      }, () => {
        localStorage.setItem('token', data.token)
        this.props.history.push('/userprofile')
        this.loadFavorites()
      })
    })
  }

  // Handling keeping user logged in during a refresh
  reAuth = () => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/userprofile', {
        method: 'GET', 
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({
        user: data.user,
        token: data.token,
        currentUser: data.user 
      }))
      this.loadFavorites()
    }
  }
  
  // Handles choosing specific glass-blower to see their page
  handleChosen = (blower) => {
    this.setState({
      selectedBlower: blower
    })
    this.props.history.push('/userprofile')
  }
  
  // Home button
  handleHome = (user) => {
    this.setState({user: user, selectedBlower: null})
    this.loadFavorites()
    this.props.history.push('/userprofile')
  }

  // Functionality for adding favorites
  handleFavorite = (userId, artId) => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        art_piece_id: artId
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        favorites: [...this.state.favorites, data]
      })
    })
   }
  }

  handleUnfavorite = (userId, artId) => {

    const fave = this.state.favorites.find(favorite => favorite.art_piece_id === artId)

    let token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:3000/favorites/${fave.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        art_piece_id: artId
      })
    })
    this.setState(prevState => ({
        favorites: prevState.favorites.filter(favorite => favorite.id !== fave.id)
    }))
  }
}
// Loading user favorites at app start
  loadFavorites = () => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/favorites', {
        method: 'GET', 
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({
        favorites: data
      }))    
  }
}

// Updating user info

  handleUpdate = (info) => {
      console.log(info)
      this.props.history.push('/update')
    }

  render(){
    return (
      <div className='App'>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} handleHome={this.handleHome} />

        <div className='body'>
          <Switch>
            <Route path='/glassblowers' exact component={this.renderBlowers} />
            <Route path='/login' exact component={this.renderForms} />
            <Route path='/signup' exact component={this.renderForms} />
            <Route path='/finishsignup' exact component={this.renderFinishSignup} />
            <Route path='/userprofile' exact component={this.goToUser} />
            <Route path='/update' exact component={this.renderUpdateForm} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
