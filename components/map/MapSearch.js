import React, { memo, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { geoCentroid } from 'd3-geo'
import get from 'lodash/get'
import head from 'lodash/head'

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

function MapSearch({
  geographies,
  open,
  selectedCountry,
  setSelectedCountry,
  setPosition,
  setAnchorEl,
  setPopoverContent,
}) {
  const classes = useStyles()
  const [searchedText, setSearchedText] = useState('')
  const [geoData, setGeoData] = useState(geographies)

  const handleSelectSearchedCountry = geoItem => {
    const {
      properties: { ISO_A2: countryCode, NAME: countryName },
    } = geoItem

    setPosition({ coordinates: geoCentroid(geoItem), zoom: 400 })
    setSelectedCountry(countryCode)
    setAnchorEl(document.getElementById(countryCode))
    setPopoverContent(`${countryCode} ${countryName}`)
  }

  const handleChangeSearchText = event => {
    setSearchedText(event.target.value.toLowerCase())

    setGeoData(
      geographies.filter(geoItem =>
        get(geoItem, 'properties.NAME', '')
          .toLowerCase()
          .includes(searchedText)
      )
    )
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (geoData.length === 1) {
      const selectedGeoItem = head(geoData)

      setSearchedText(get(selectedGeoItem, 'properties.NAME', ''))
      handleSelectSearchedCountry(selectedGeoItem)
    }
  }

  const renderList = () => {
    return geoData.map(geoItem => {
      const countryName = get(geoItem, 'properties.NAME', '')

      return (
        <div key={`search-item-${countryName}`} onClick={() => handleSelectSearchedCountry(geoItem)}>
          <span>{countryName}</span>
        </div>
      )
    })
  }

  return (
    <div className={classes.root}>
      <form className={classes.inputWrapper} onSubmit={handleSubmit}>
        <TextField
          label="Country Name"
          variant="outlined"
          onChange={handleChangeSearchText}
          inputProps={{
            value: searchedText,
          }}
        />
        <IconButton aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </form>
      <div className={classes.countryList}>{renderList()}</div>
    </div>
  )
}

export default memo(MapSearch)
