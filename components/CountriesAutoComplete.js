import React, { memo } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import countryToFlag from '../helpers/countryToFlagCode'

const useStyles = makeStyles(
  {
    root: {
      margin: '3px 0',
    },
    option: {
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  },
  { name: 'CountriesAutoComplete' }
)

function CountriesAutoComplete({ geographies, label, onChange, ...restProps }) {
  const classes = useStyles()

  return (
    <Autocomplete
      options={geographies}
      getOptionLabel={geoItem => geoItem.properties.NAME}
      classes={{
        root: classes.root,
        option: classes.option,
      }}
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
      onChange={onChange}
      renderInput={params => <TextField {...params} label={label} variant="outlined" />}
      autoHighlight
      {...restProps}
    />
  )
}

export default memo(CountriesAutoComplete)
