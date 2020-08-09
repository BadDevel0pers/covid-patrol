import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    padding: 0,
  },
  content: {
    padding: theme.spacing(0.5),
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.root} maxWidth={false}>
        <Grid item xs={12}>
          <div className={classes.content}>Powered by bad-devs</div>
        </Grid>
      </Container>
    </>
  )
}
