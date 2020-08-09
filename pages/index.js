import React from 'react'
import Map from '../components/map/Map'
import { Container, Grid } from '@material-ui/core'

export default function Home() {
  return (
    <Container maxWidth={false}>
      <Grid item>
        <Map />
      </Grid>
    </Container>
  )
}
