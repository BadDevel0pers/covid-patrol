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
import MapDestinations from './MapDestinations'
import MapLegend from './MapLegend'
import mapData from '../../helpers/map/mapData'
import getMapHeight from '../../helpers/map/getMapHeight'
import countryToFlag from '../../helpers/countryToFlagCode'

const MAP_MIN_ZOOM = 0.66
const MAP_MAX_ZOOM = 8
const MAP_SELECTED_COUNTRY_ZOOM = 3
const MAP_ZOOM_MULTIPLIER = 1.5

const styles = theme => ({
  root: {
    paddingTop: 30,
  },
  mapContainer: {
    position: 'relative',
    overflow: 'hidden',
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
  const [countryFrom, setCountryFrom] = useState(null)
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

  useEffect(() => {
    setIsWorldMapType(!Boolean(countryFrom))
  }, [countryFrom])

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

  const handleCountryChange = (event, geo) => {
    const {
      properties: { ISO_A2: countryCode, NAME: countryName },
    } = geo
    const selectedAreaElement = get(event, 'currentTarget', document.getElementById(countryCode))

    setPosition({ coordinates: geoCentroid(geo), zoom: MAP_SELECTED_COUNTRY_ZOOM })
    setAnchorEl(selectedAreaElement)
    setPopoverContent(`${countryCode} ${countryName}`)
    setSelectedCountry(countryCode)

    handleCloseTooltip()
  }

  const handleClosePopover = () => {
    setSelectedCountry(null)
    setAnchorEl(null)
    setPopoverContent(null)
  }

  const handleMapTypeChange = event => {
    setIsWorldMapType(get(event, 'target.checked', false))
  }

  const handleCloseTooltip = () => {
    setTooltipContent('')
    setTooltipAnchor(null)
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid item xs={12}>
          <MapDestinations
            geographies={geographies}
            onChange={handleCountryChange}
            handleClosePopover={handleClosePopover}
            countryFrom={countryFrom}
            onChangeCountryFrom={setCountryFrom}
          />
        </Grid>
        <Grid item>
          <label className={classes.switchLabel}>
            {countryFrom && (
              <Typography variant="body1" component="span">
                For {countryToFlag(countryFrom)} {countryFrom} citizens
              </Typography>
            )}
            <Switch
              checked={isWorldMapType}
              onChange={handleMapTypeChange}
              name="worldUsaSwitcher"
              disabled={!countryFrom}
            />
            <Typography variant="body1" component="span">
              Worldwide
            </Typography>
          </label>
        </Grid>
      </Grid>

      <div className={classes.mapContainer}>
        <ComposableMap height={mapHeight}>
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMapMove}>
            <Graticule stroke={theme.palette.map.border} strokeWidth={0.4} />
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
                      onClick={event => handleCountryChange(event, geo)}
                      onMouseEnter={event => {
                        setTooltipContent(countryName)
                        setTooltipAnchor(event.currentTarget)
                      }}
                      onMouseLeave={handleCloseTooltip}
                      style={geographyStyles}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <MapPopover anchorEl={anchorEl} onClose={handleClosePopover} content={popoverContent} />

        <MapSideBar handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />

        <MapLegend />
      </div>
    </div>
  )
}

export default memo(MapChart)
