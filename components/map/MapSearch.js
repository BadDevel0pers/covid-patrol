import React, { memo } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(
  {
    root: {},
    inputWrapper: {
      display: 'flex',
    },
  },
  { name: 'MapSearch' }
)

function MapSearch({ open }) {
  const classes = useStyles()

  const handleSearch = event => {
    event.preventDefault()
    console.log('handleSearch')
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSearch} className={classes.inputWrapper}>
        <TextField label="Country Name" variant="outlined" />
        <IconButton aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  )
}

export default memo(MapSearch)
