import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'

import CountriesAutoComplete from '../CountriesAutoComplete'

function MapDestinations({ geographies, onChange, handleClosePopover }) {
  const defaultOriginCountry = geographies.find(geoItem => geoItem.properties.ISO_A2 === 'US')

  const handleCountryChange = (event, geoItem) => {
    if (geoItem) {
      onChange(null, geoItem)
    } else {
      handleClosePopover()
    }
  }

  return (
    <Grid alignItems="center" justify="center" container>
      <Grid xs={12} md={5} item>
        <CountriesAutoComplete
          id="country-from"
          options={geographies}
          onChange={() => {}}
          defaultValue={defaultOriginCountry}
          label={'Country from'}
          disabled
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
