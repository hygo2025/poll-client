import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { userActions } from '../../_actions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#FFF',
    '&:hover, &:focus': {
      color: '#FFF',
      textDecoration: 'none',
    },
  },
}))

export const Menu = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" component="h1" className={classes.title}>
          <Link to="/" className={classes.link}>
            Poll
          </Link>
        </Typography>
        {localStorage.getItem('user') && (
          <>
            <Button
              onClick={() => {
                history.push('/polls')
              }}
              color="inherit"
            >
              Create Poll
            </Button>

            <Button
              onClick={() => {
                dispatch(userActions.logout())
                history.push('/login')
              }}
              color="inherit"
            >
              Logout
            </Button>
          </>
        )}
        {!localStorage.getItem('user') && (
          <Button
            onClick={() => {
              history.push('/login')
            }}
            color="inherit"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
