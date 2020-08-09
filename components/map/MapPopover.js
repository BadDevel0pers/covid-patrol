import React, { memo } from 'react'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import Divider from '@material-ui/core/Divider'
import advisoryIcons from '../../helpers/advisoryIcons'
import countryToFlag from '../../helpers/countryToFlagCode'

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
    advisoryUpdate: {
      marginTop: 15,
    },
    description: {
      marginTop: 15,
      marginBottom: 15,
    },
    title: {
      marginBottom: 15,
    },
  },
  { name: 'MapPopover' }
)

function MapPopover({ anchorEl, content, onClose }) {
  const classes = useStyles()
  const {
    name,
    isoName,
    description,
    lastUpdate,
    advisory: { score, updated },
  } = content

  function IconContainer(props) {
    const { value, ...other } = props
    return <span {...other}>{advisoryIcons[value].icon}</span>
  }

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
        <div className={classes.title}>
          <Typography variant="h4">
            {countryToFlag(isoName)} {name}
          </Typography>
          <Divider />
        </div>
        <Box>
          <Typography variant="caption" component="legend">
            <b>{isoName}</b> advisory index
          </Typography>
          <Rating
            name="customized-icons"
            readOnly
            defaultValue={score}
            getLabelText={value => advisoryIcons[Math.trunc(value)].label}
            IconContainerComponent={IconContainer}
          />
        </Box>
        <Typography variant="caption" component="div">
          Advisory updated: {updated}
        </Typography>
        <Box>
          <div dangerouslySetInnerHTML={{ __html: description }} className={classes.description} />
          <Typography variant="caption" className={classes.advisoryUpdate} component="div">
            Updated: {lastUpdate}
          </Typography>
        </Box>
        <IconButton aria-label="close" color="primary" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </Popover>
  )
}

export default memo(MapPopover)
