import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    padding: 0,
  },
  title: {
    padding: theme.spacing(3),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}))

function HeaderNavbar() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Typography className={classes.title}>Covid Patrol Project</Typography>
    </AppBar>
  )
}

export default HeaderNavbar
