import React, { memo } from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(
  {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
    },
    wrapper: {
      position: 'relative',
      padding: '30px 30px',
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 45,
      height: 45,
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
      <div className={classes.wrapper}>
        <Typography>{content}</Typography>
        <Typography>{content}</Typography>
        <Typography>{content}</Typography>
        <Typography>
          {content}
          {content}
          {content}
          {content}
        </Typography>
        <Typography>{content}</Typography>
        <Typography>{content}</Typography>
        <Typography>{content}</Typography>

        <IconButton aria-label="close" color="primary" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </Popover>
  )
}

export default memo(MapPopover)
