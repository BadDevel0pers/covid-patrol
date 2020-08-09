import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'

import CountriesAutoComplete from '../CountriesAutoComplete'

function MapDestinations({ geographies }) {
  const defaultOriginCountry = geographies.find(geoItem => geoItem.properties.ISO_A2 === 'US')

  const handleCountrySelect = () => {}

  return (
    <Grid alignItems="center" justify="center" container>
      <Grid xs={12} md={5} item>
        <CountriesAutoComplete
          id="country-from"
          geographies={geographies}
          onChange={handleCountrySelect}
          defaultValue={defaultOriginCountry}
          label={'Country from'}
        />
      </Grid>
      <Grid md={1} item />
      <Grid xs={12} md={5} item>
        <CountriesAutoComplete
          id="country-to"
          geographies={geographies}
          onChange={handleCountrySelect}
          label={'Country to'}
        />
      </Grid>
    </Grid>
  )
}

export default memo(MapDestinations)
