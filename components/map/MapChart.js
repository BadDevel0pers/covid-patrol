import React, { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import get from 'lodash/get'
import { geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'

import MapPopover from './MapPopover'
import MapSideBar from './MapSideBar'
import mapData from '../../helpers/map/mapData'

const styles = theme => ({
  root: {
    position: 'relative',
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

  const handleMapTypeChange = event => {
    setIsWorldMapType(get(event, 'target.checked', false))
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">for usa citizens</Typography>
            </Grid>
            <Grid item>
              <Switch checked={isWorldMapType} onChange={handleMapTypeChange} name="worldUsaSwitcher" />
            </Grid>
            <Grid item>
              <Typography variant="caption">worldwide</Typography>
            </Grid>
          </Grid>
        </Typography>
      </div>

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
