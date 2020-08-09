import React, { memo, useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import clsx from 'clsx'

import CountriesAutoComplete from '../CountriesAutoComplete'

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
    iconButton: {
      width: 45,
      height: 45,
    },
  }),
  { name: 'MapSearch' }
)

function MapSearch({ geographies, handleCountryChange, handleClosePopover }) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      handleClosePopover()
    }
  }, [isOpen])

  const handleSearch = (event, geoItem) => {
    if (geoItem) {
      handleCountryChange(null, geoItem)

      setIsOpen(false)
    } else {
      handleClosePopover()
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
          <CountriesAutoComplete
            id="search-countries"
            style={{ width: 200 }}
            options={geographies}
            onChange={handleSearch}
            label="Choose a country"
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
