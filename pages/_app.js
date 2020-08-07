import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from '../components/theme'
import Footer from '../components/Footer'
import Head from 'next/head'

const styles = () => ({
  main: {
    flex: '1 0 auto',
  },
})

const useStyles = makeStyles(styles)

function MyApp({ Component, pageProps }) {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Covid Patrol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </MuiThemeProvider>
  )
}

export default MyApp
