import React, { memo, useState } from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  {
    root: {
      pointerEvents: 'none',
    },
    paper: {
      padding: 10,
      fontWeight: 700,
    },
  },
  { name: 'MapTooltip' }
)

function MapPopover({ anchorEl, content }) {
  const classes = useStyles()

  return (
    <Popover
      open={Boolean(content)}
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {content}
    </Popover>
  )
}

export default memo(MapPopover)
