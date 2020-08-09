import React, { memo, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { geoCentroid } from 'd3-geo'
import Slide from '@material-ui/core/Slide'
import clsx from 'clsx'

import countryToFlag from '../../helpers/countryToFlagCode'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 66,
    },
    searchBarContainer: {
      backgroundColor: theme.palette.background.default,
      padding: 5,
      boxShadow: '2px 4px 12px 0px rgba(0,0,0,0.25)',
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
    iconButton: {
      width: 45,
      height: 45,
    },
  }),
  { name: 'MapSearch' }
)

function MapSearch({ geographies, setSelectedCountry, setPosition, setAnchorEl, setPopoverContent }) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAnchorEl(null)
    }
  }, [isOpen])

  const handleSearch = (event, geoItem) => {
    if (geoItem) {
      const {
        properties: { ISO_A2: countryCode, NAME: countryName },
      } = geoItem

      setPosition({ coordinates: geoCentroid(geoItem), zoom: 8 })
      setSelectedCountry(countryCode)
      setAnchorEl(document.getElementById(countryCode))
      setPopoverContent(`${countryCode} ${countryName}`)
      setIsOpen(false)
    } else {
      setSelectedCountry(null)
      setAnchorEl(null)
      setPopoverContent(null)
    }
  }

  const handleToggleSearch = () => {
    setIsOpen(isSearchOpen => !isSearchOpen)
  }

  return (
    <div className={classes.root}>
      {!isOpen && (
        <IconButton aria-label="search" color="primary" className={classes.iconButton} onClick={handleToggleSearch}>
          <SearchIcon />
        </IconButton>
      )}
      <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
        <div className={clsx([classes.root, classes.searchBarContainer])}>
          <Autocomplete
            id="search-countries"
            style={{ width: 300 }}
            options={geographies}
            classes={{
              option: classes.option,
            }}
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
            renderInput={params => <TextField {...params} label="Choose a country" variant="outlined" autoFocus />}
            autoHighlight
          />
          {isOpen && (
            <IconButton
              aria-label="close-search"
              color="primary"
              className={classes.iconButton}
              onClick={handleToggleSearch}
            >
              <CloseIcon />
            </IconButton>
          )}
        </div>
      </Slide>
    </div>
  )
}

export default memo(MapSearch)
