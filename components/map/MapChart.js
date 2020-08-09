import React, { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule, ZoomableGroup } from 'react-simple-maps'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WorldIcon from '@material-ui/icons/Public'
import WorldLockIcon from '@material-ui/icons/VpnLockSharp'
import { geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'

import MapPopover from './MapPopover'
import MapSideBar from './MapSideBar'
import mapData from '../../helpers/map/mapData'

const MAP_HEIGHT = 500

const styles = theme => ({
  root: {
    position: 'relative',
    maxHeight: '80vh',
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
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverContent, setPopoverContent] = useState(null)
  const [isWorldMapType, setIsWorldMapType] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleZoomIn = () => {
    if (position.zoom >= 8) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }))

    if (anchorEl) {
      setAnchorEl(null)
      setSelectedCountry(null)
    }
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }))

    if (anchorEl) {
      setAnchorEl(null)
      setSelectedCountry(null)
    }
  }

  const handleMapMove = mapDetails => {
    console.log('mapDetails ', mapDetails)
    setPosition({
      coordinates: mapDetails.coordinates,
      zoom: mapDetails.zoom,
    })
  }

  const handleClick = (event, geo) => {
    const {
      properties: { ISO_A2: countryCode, NAME: countryName },
    } = geo

    setPosition({ coordinates: geoCentroid(geo), zoom: 4 })
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

  console.log('position ', position.coordinates)

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
        // projectionConfig={{
        //   center: position.coordinates,
        //   scale: position.zoom,
        // }}
        height={MAP_HEIGHT}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveStart={pos => {
            return false
          }}
          onMove={pos => {
            return false
          }}
          onMoveEnd={handleMapMove}
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
                    strokeWidth: '0.35',
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
        </ZoomableGroup>
      </ComposableMap>

      <MapPopover anchorEl={anchorEl} onClose={handleClosePopover} content={popoverContent} />

      <MapSideBar
        geographies={geographies}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setPosition={setPosition}
        setAnchorEl={setAnchorEl}
        setPopoverContent={setPopoverContent}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
    </div>
  )
}

export default memo(MapChart)
