import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const MAP_MOBILE_HEIGHT = 800
const MAP_TABLET_HEIGHT = 500
const MAP_DESKTOP_HEIGHT = 300

function getMapHeight() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  if (isMobile) {
    return MAP_MOBILE_HEIGHT
  }

  if (isTablet) {
    return MAP_TABLET_HEIGHT
  }

  return MAP_DESKTOP_HEIGHT
}

export default getMapHeight
