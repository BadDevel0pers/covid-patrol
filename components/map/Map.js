import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MapChart from './MapChart'
import MapTooltip from './MapTooltip'

const useStyles = makeStyles(
  {
    root: {},
  },
  { name: 'Map' }
)

function Map() {
  const [content, setContent] = useState('')
  const [tooltipAnchorEl, setTooltipAnchor] = useState(null)
  const classes = useStyles()

  return (
    <div className={classes.mapRoot}>
      <MapChart setTooltipContent={setContent} setTooltipAnchor={setTooltipAnchor} />
      <MapTooltip content={content} anchorEl={tooltipAnchorEl} />
    </div>
  )
}

export default memo(Map)
