import React, { memo, useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule, ZoomableGroup } from 'react-simple-maps'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import get from 'lodash/get'
import { geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'
import fetch from 'isomorphic-fetch'

import MapPopover from './MapPopover'
import MapSideBar from './MapSideBar'
import mapData from '../../helpers/map/mapData'
import getMapHeight from '../../helpers/map/getMapHeight'

const MAP_MIN_ZOOM = 0.66
const MAP_MAX_ZOOM = 8
const MAP_SELECTED_COUNTRY_ZOOM = 3
const MAP_ZOOM_MULTIPLIER = 1.5

const styles = theme => ({
  root: {
    position: 'relative',
    maxHeight: '80vh',
    overflow: 'hidden',
  },
  buttonContainer: {
    '& button + button': {
      marginLeft: theme.spacing(3),
    },
  },
  switchLabel: {
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
})

const useStyles = makeStyles(styles, { name: 'MapChart' })

const MapChart = ({ setTooltipContent, setTooltipAnchor }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [geographies] = useState(feature(mapData, mapData.objects[Object.keys(mapData.objects)[0]]).features)
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: MAP_MIN_ZOOM })
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverContent, setPopoverContent] = useState(null)
  const [isWorldMapType, setIsWorldMapType] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const mapHeight = getMapHeight()

  async function getAllCountries() {
    const res = await fetch('/api/countries')
    const newData = await res.json()
    setCountries(newData)
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  const handleZoomIn = () => {
    if (position.zoom >= MAP_MAX_ZOOM) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom * MAP_ZOOM_MULTIPLIER }))

    if (anchorEl) {
      setAnchorEl(null)
      setSelectedCountry(null)
    }
  }

  const handleZoomOut = () => {
    if (position.zoom <= MAP_MIN_ZOOM) return

    setPosition(pos => ({ ...pos, zoom: pos.zoom / MAP_ZOOM_MULTIPLIER }))

    if (anchorEl) {
      setAnchorEl(null)
      setSelectedCountry(null)
    }
  }

  const handleMapMove = mapDetails => {
    setPosition({
      coordinates: mapDetails.coordinates,
      zoom: mapDetails.zoom,
    })
  }

  const handleSelectCountry = (event, geo) => {
    const {
      properties: { ISO_A2: countryCode, NAME: countryName },
    } = geo
    const selectedAreaElement = get(event, 'currentTarget', document.getElementById(countryCode))

    setPosition({ coordinates: geoCentroid(geo), zoom: MAP_SELECTED_COUNTRY_ZOOM })
    setAnchorEl(selectedAreaElement)
    setPopoverContent(`${countryCode} ${countryName}`)
    setSelectedCountry(countryCode)
  }

  const handleClosePopover = () => {
    setSelectedCountry(null)
    setAnchorEl(null)
    setPopoverContent(null)
  }

  const handleMapTypeChange = event => {
    setIsWorldMapType(get(event, 'target.checked', false))
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <label className={classes.switchLabel}>
              <Typography variant="caption">for usa citizens</Typography>
              <Switch checked={isWorldMapType} onChange={handleMapTypeChange} name="worldUsaSwitcher" />
              <Typography variant="caption">worldwide</Typography>
            </label>
          </Grid>
        </Grid>
      </div>

      <ComposableMap
        // projectionConfig={{
        //   center: position.coordinates,
        //   scale: position.zoom,
        // }}
        height={mapHeight}
      >
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMapMove}>
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
                    onClick={event => handleSelectCountry(event, geo)}
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
        handleSelectCountry={handleSelectCountry}
        handleClosePopover={handleClosePopover}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
    </div>
  )
}

export default memo(MapChart)
