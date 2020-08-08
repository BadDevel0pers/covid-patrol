import React, { useEffect } from 'react'
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
  // remove it here
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Covid Patrol</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.main}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </MuiThemeProvider>
    </>
  )
}

export default MyApp
