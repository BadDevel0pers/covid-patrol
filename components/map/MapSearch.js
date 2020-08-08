import React, { memo } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { geoCentroid } from 'd3-geo'

const useStyles = makeStyles(
  {
    root: {},
    inputWrapper: {
      display: 'flex',
    },
    countryList: {
      maxHeight: 200,
      overflowY: 'scroll',
    },
  },
  { name: 'MapSearch' }
)

function MapSearch({ geographies, open, selectedCountry, setSelectedCountry, setPosition }) {
  const classes = useStyles()

  const handleSelectSearchedCountry = geoItem => {
    const {
      properties: { ISO_A2: countryCode },
    } = geoItem

    setPosition({ coordinates: geoCentroid(geoItem), zoom: 400 })
    setSelectedCountry(countryCode)
  }

  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <TextField label="Country Name" variant="outlined" />
        <IconButton aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </div>
      <div className={classes.countryList}>
        {geographies.map(geoItem => {
          return (
            <div onClick={() => handleSelectSearchedCountry(geoItem)}>
              <span>{geoItem.properties.NAME}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(MapSearch)
