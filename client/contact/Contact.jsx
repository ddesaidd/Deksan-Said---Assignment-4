import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, TextField, CardActions, Button } from '@material-ui/core'
import { create } from './api-contact.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2)
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

export default function Contact() {
  const classes = useStyles()
  
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
    success: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const contact = {
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      message: values.message || undefined
    }

    create(contact).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ 
          firstname: '',
          lastname: '',
          email: '',
          message: '',
          success: true,
          error: ''
        })
      }
    })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Contact Us
        </Typography>
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
          id="message"
          label="Message"
          multiline
          rows={4}
          className={classes.textField}
          value={values.message}
          onChange={handleChange('message')}
          margin="normal"
        /><br/>
        {values.success && (
          <Typography component="p" style={{ color: 'green' }}>
            Message sent successfully!
          </Typography>
        )}
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
          Send Message
        </Button>
      </CardActions>
    </Card>
  )
}