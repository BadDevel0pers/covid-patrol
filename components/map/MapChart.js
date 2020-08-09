import React, { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WorldIcon from '@material-ui/icons/Public'
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
  controlButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateY(-50%)',
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

  const handleClosePopover = () => {
    setAnchorEl(null)
    setSelectedCountry(null)
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
      <MapSearch
        geographies={geographies}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setPosition={setPosition}
        setAnchorEl={setAnchorEl}
        setPopoverContent={setPopoverContent}
      />
      <ComposableMap
        projectionConfig={{
          center: position.coordinates,
          scale: position.zoom,
        }}
      >
        <Graticule stroke={theme.palette.map.border} strokeWidth={0.5} onClick={handleClosePopover} />
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

              if (selectedCountry === countryCode) {
                geographyStyles.default.fill = geographyStyles.hover.fill
              }

              if (selectedCountry) {
                geographyStyles.hover.fill = theme.palette.map.default
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
      <MapPopover anchorEl={anchorEl} onClose={handleClosePopover} content={popoverContent} />
      <div className={classes.controlButtons}>
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default memo(MapChart)
