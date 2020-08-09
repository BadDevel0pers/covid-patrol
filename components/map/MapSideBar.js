import React, { memo } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ZoomInIcon from '@material-ui/icons/Add'
import ZoomOutIcon from '@material-ui/icons/Remove'
import { makeStyles } from '@material-ui/core/styles'

import MapSearch from './MapSearch'

const useStyles = makeStyles(
  {
    sideBar: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
    },
    iconButton: {
      width: 45,
      height: 45,
    },
    controlButtons: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'MapSideBar' }
)

function MapSideBar({
  geographies,
  selectedCountry,
  setSelectedCountry,
  setPosition,
  setAnchorEl,
  setPopoverContent,
  handleZoomIn,
  handleZoomOut,
}) {
  const classes = useStyles()

  return (
    <div className={classes.sideBar}>
      <MapSearch
        geographies={geographies}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setPosition={setPosition}
        setAnchorEl={setAnchorEl}
        setPopoverContent={setPopoverContent}
      />
      <div className={classes.controlButtons}>
        <IconButton aria-label="zoom-in" color="primary" className={classes.iconButton} onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton aria-label="zoom-out" color="primary" className={classes.iconButton} onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default memo(MapSideBar)
