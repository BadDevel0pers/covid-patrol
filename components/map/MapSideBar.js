import React, { memo } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ZoomInIcon from '@material-ui/icons/Add'
import ZoomOutIcon from '@material-ui/icons/Remove'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  theme => ({
    sideBar: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
    },
    iconButton: {
      width: 45,
      height: 45,
      backgroundColor: theme.palette.background.default,
      boxShadow:
        'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      '&:hover, &:active, &:focus': {
        opacity: 1,
        backgroundColor: theme.palette.background.hover,
      },
    },
    controlButtons: {
      display: 'flex',
      flexDirection: 'column',
      '& button + button': {
        marginTop: 5,
      },
    },
  }),
  { name: 'MapSideBar' }
)

function MapSideBar({ handleZoomIn, handleZoomOut }) {
  const classes = useStyles()

  return (
    <div className={classes.sideBar}>
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
