import React, { memo } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { geoCentroid } from 'd3-geo'

import countryToFlag from '../../helpers/countryToFlagCode'

const useStyles = makeStyles(
  {
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
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
  const handleSearch = (event, geoItem) => {
    if (geoItem) {
      const {
        properties: { ISO_A2: countryCode, NAME: countryName },
      } = geoItem

      setPosition({ coordinates: geoCentroid(geoItem), zoom: 400 })
      setSelectedCountry(countryCode)
      setAnchorEl(document.getElementById(countryCode))
      setPopoverContent(`${countryCode} ${countryName}`)
    } else {
      setSelectedCountry(null)
      setAnchorEl(null)
      setPopoverContent(null)
    }
  }

  return (
    <Autocomplete
      id="search-countries"
      style={{ width: 300 }}
      options={geographies}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={geoItem => geoItem.properties.NAME}
      renderOption={geoItem => {
        const {
          properties: { ISO_A2: countryCode, NAME: countryName },
        } = geoItem
        return (
          <>
            <span>{countryToFlag(countryCode)}</span>
            {countryName}
          </>
        )
      }}
      onChange={handleSearch}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  )
}

export default memo(MapSearch)
