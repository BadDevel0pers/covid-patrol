import React, { memo } from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  {
    root: {
      pointerEvents: 'none',
    },
    paper: {
      padding: 15,
    },
  },
  { name: 'MapPopover' }
)

function MapPopover({ anchorEl, content, onClose }) {
  const classes = useStyles()

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Typography>{content}</Typography>
    </Popover>
  )
}

export default memo(MapPopover)
