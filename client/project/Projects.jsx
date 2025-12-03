import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, List, ListItem, ListItemText, Typography, IconButton, ListItemSecondaryAction, Button } from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { list, remove } from './api-project.js'
import { Link } from 'react-router-dom'
import auth from '../lib/auth-helper.js'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 800,
    marginTop: theme.spacing(5)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  addButton: {
    marginBottom: theme.spacing(2)
  }
}))

export default function Projects() {
  const classes = useStyles()
  const [projects, setProjects] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setProjects(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleDelete = (projectId) => {
    remove({ projectId: projectId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setProjects(projects.filter(p => p._id !== projectId))
      }
    })
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Projects
      </Typography>
      {jwt && jwt.user.role === 'admin' && (
        <Button 
          component={Link} 
          to="/project/new"
          variant="contained" 
          color="primary"
          className={classes.addButton}
        >
          Add New Project
        </Button>
      )}
      <List dense>
        {projects.map((item, i) => (
          <ListItem key={i}>
            <ListItemText 
              primary={item.title}
              secondary={`${item.firstname} ${item.lastname} - ${item.email} - ${item.description}`}
            />
            {jwt && jwt.user.role === 'admin' && (
              <ListItemSecondaryAction>
                <IconButton 
                  component={Link} 
                  to={`/project/edit/${item._id}`}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(item._id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}