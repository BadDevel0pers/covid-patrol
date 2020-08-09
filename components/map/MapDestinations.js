import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'

import CountriesAutoComplete from '../CountriesAutoComplete'

function MapDestinations({ geographies, onChange, onChangeCountryFrom, handleClosePopover }) {
  const handleCountryChange = (event, geoItem) => {
    if (geoItem) {
      onChange(null, geoItem)
    } else {
      handleClosePopover()
    }
  }

  const handleChangeCountryFrom = (event, geoItem) => {
    if (geoItem) {
      const {
        properties: { ISO_A2: countryCode },
      } = geoItem

      onChangeCountryFrom(countryCode)
    } else {
      onChangeCountryFrom(null)
    }
  }

  return (
    <Grid alignItems="center" justify="center" container>
      <Grid xs={12} md={5} item>
        <CountriesAutoComplete
          id="country-from"
          options={geographies}
          onChange={handleChangeCountryFrom}
          label={'Country from'}
        />
      </Grid>
      <Grid md={1} item />
      <Grid xs={12} md={5} item>
        <CountriesAutoComplete
          id="country-to"
          options={geographies}
          onChange={handleCountryChange}
          label={'Country to'}
        />
      </Grid>
    </Grid>
  )
}

export default memo(MapDestinations)
