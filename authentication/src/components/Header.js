import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

// Could sign out the user with a signout rout & dedicated component that triggers the signout
// on componentWillMount and show a goodby message etc
import { signoutUser } from '../actions'

class Header extends Component {
  render(){
    const { authenticated, signoutUser } = this.props

    return (
      <header className="App-header">
        <h1 className="App-title">Authentication Front End</h1>
        <nav>
          <li><Link to="/">Home</Link></li>
          {authenticated 
            ? <li><Link to="/" onClick={signoutUser}>Sign Out</Link></li>
            : [<li key={1}><Link to="/signin">Sign In</Link></li>,
              <li key={2}><Link to="/signup">Sign Up</Link></li>]
          }
        </nav>
      </header>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({signoutUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)