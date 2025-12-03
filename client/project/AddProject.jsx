import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, TextField, CardActions, Button } from '@material-ui/core'
import { create } from './api-project.js'
import { Navigate } from 'react-router-dom'
import auth from '../lib/auth-helper.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function AddProject() {
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  
  const [values, setValues] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: '',
    redirect: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const project = {
      title: values.title || undefined,
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      completion: values.completion || undefined,
      description: values.description || undefined
    }

    create(project).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, redirect: true })
      }
    })
  }

  if (values.redirect) {
    return <Navigate to='/projects' />
  }

  if (!jwt || jwt.user.role !== 'admin') {
    return <Navigate to='/signin' />
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Add Project
        </Typography>
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        /><br/>
        <TextField
          id="firstname"
          label="First Name"
          className={classes.textField}
          value={values.firstname}
          onChange={handleChange('firstname')}
          margin="normal"
        /><br/>
        <TextField
          id="lastname"
          label="Last Name"
          className={classes.textField}
          value={values.lastname}
          onChange={handleChange('lastname')}
          margin="normal"
        /><br/>
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        /><br/>
        <TextField
          id="completion"
          type="date"
          label="Completion Date"
          className={classes.textField}
          value={values.completion}
          onChange={handleChange('completion')}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        /><br/>
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        /><br/>
        {values.error && (
          <Typography component="p" color="error">
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}