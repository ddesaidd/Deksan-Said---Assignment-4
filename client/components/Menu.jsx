import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' }
}

export default function Menu() {
  const navigate = useNavigate()
  const location = useLocation()
  const jwt = auth.isAuthenticated()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        
        <Link to="/" style={{ textDecoration: 'none' }}>
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        
        <Link to="/qualifications" style={{ textDecoration: 'none' }}>
          <Button style={isActive(location, "/qualifications")}>Education</Button>
        </Link>
        
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <Button style={isActive(location, "/projects")}>Projects</Button>
        </Link>
        
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <Button style={isActive(location, "/contact")}>Contact</Button>
        </Link>

        {/* Show Users link only for admin */}
        {jwt && jwt.user && jwt.user.role === 'admin' && (
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <Button style={isActive(location, "/users")}>Users</Button>
          </Link>
        )}

        {/* Show Signup and Signin when not authenticated */}
        {!jwt && (
          <span>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button style={isActive(location, "/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}

        {/* Show profile and signout when authenticated */}
        {jwt && jwt.user && (
          <span>
            <Link to={"/user/" + jwt.user._id} style={{ textDecoration: 'none' }}>
              <Button style={isActive(location, "/user/" + jwt.user._id)}>
                My Profile
              </Button>
            </Link>
            <Button 
              color="inherit" 
              onClick={() => {
                auth.clearJWT(() => navigate('/'))
              }}
              style={{ color: '#ffffff' }}
            >
              Sign out {jwt.user.role && `(${jwt.user.role})`}
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  )
}