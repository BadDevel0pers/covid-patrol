import React, { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import WorldIcon from '@material-ui/icons/Public'
import ZoomInIcon from '@material-ui/icons/Add'
import ZoomOutIcon from '@material-ui/icons/Remove'
import WorldLockIcon from '@material-ui/icons/VpnLockSharp'
import { geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'

import MapPopover from './MapPopover'
import MapSearch from './MapSearch'
import mapData from '../../helpers/map/mapData'

const styles = theme => ({
  root: {
    position: 'relative',
  },
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
  buttonContainer: {
    '& button + button': {
      marginLeft: theme.spacing(3),
    },
  },
})

const useStyles = makeStyles(styles, { name: 'MapChart' })

const MapChart = ({ setTooltipContent, setTooltipAnchor }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [geographies] = useState(feature(mapData, mapData.objects[Object.keys(mapData.objects)[0]]).features)
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 120 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverContent, setPopoverContent] = useState(null)
  const [isWorldMapType, setIsWorldMapType] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleZoomIn = () => {
    if (position.zoom >= 600) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 100) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }))
  }

  const handleClick = (event, geo) => {
    const {
      properties: { ISO_A2: countryCode, NAME: countryName },
    } = geo

    setPosition({ coordinates: geoCentroid(geo), zoom: 400 })
    setAnchorEl(event.currentTarget)
    setPopoverContent(`${countryCode} ${countryName}`)
    setSelectedCountry(countryCode)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleWorldMapClick = () => {
    setIsWorldMapType(true)
  }

  const handleUSAMapClick = () => {
    setIsWorldMapType(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<WorldIcon />}
          onClick={handleWorldMapClick}
        >
          World Map
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<WorldLockIcon />}
          onClick={handleUSAMapClick}
        >
          For USA citizens
        </Button>
      </div>

      <ComposableMap
        projectionConfig={{
          center: position.coordinates,
          scale: position.zoom,
        }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo, index) => {
              const geographyStyles = {
                default: {
                  fill: theme.palette.map.default,
                  outline: 'none',
                  stroke: theme.palette.map.border,
                },
                hover: {
                  fill: theme.palette.warning.light,
                  outline: 'none',
                },
                pressed: {
                  fill: theme.palette.warning.light,
                  outline: 'none',
                },
              }
              const {
                properties: { ISO_A2: countryCode, NAME: countryName },
              } = geo

              // For demo
              if (!isWorldMapType) {
                geographyStyles.default.fill = theme.palette.error.main
                geographyStyles.hover.fill = theme.palette.error.dark
                geographyStyles.hover.pressed = theme.palette.error.dark

                if (index % 2 === 1) {
                  geographyStyles.default.fill = theme.palette.warning.main
                  geographyStyles.hover.fill = theme.palette.warning.dark
                  geographyStyles.hover.pressed = theme.palette.warning.dark
                }

                if (index % 5 === 1) {
                  geographyStyles.default.fill = theme.palette.success.main
                  geographyStyles.hover.fill = theme.palette.success.dark
                  geographyStyles.hover.pressed = theme.palette.success.dark
                }
              }

              return (
                <Geography
                  id={countryCode}
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={event => handleClick(event, geo)}
                  onMouseEnter={event => {
                    setTooltipContent(countryName)
                    setTooltipAnchor(event.currentTarget)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('')
                    setTooltipAnchor(null)
                  }}
                  style={geographyStyles}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <MapPopover anchorEl={anchorEl} onClose={handleClose} content={popoverContent} />

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
    </div>
  )
}

export default memo(MapChart)
