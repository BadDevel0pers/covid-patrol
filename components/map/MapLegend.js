import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'absolute',
      bottom: 15,
      left: 15,
      padding: 10,
      backgroundColor: theme.palette.background.default,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
    },
    legendIcon: {
      width: 10,
      height: 10,
      marginRight: 5,
    },
    title: {
      fontSize: 10,
    },
  }),
  { name: 'MapLegend' }
)

function MapLegend() {
  const theme = useTheme()
  const classes = useStyles()
  const MAP_LEGEND_DATA = [
    { title: 'Totally Restrictive', color: theme.palette.error.main },
    { title: 'Partially Restrictive', color: theme.palette.warning.main },
    { title: 'Not Restrictive', color: theme.palette.success.main },
  ]

  const renderLegendItem = ({ title, color }) => (
    <div key={`legendItem${title}`} className={classes.item}>
      <div className={classes.legendIcon} style={{ backgroundColor: color }} />
      <Typography className={classes.title}>{title}</Typography>
    </div>
  )

  return (
    <Box boxShadow={1} className={classes.root}>
      {MAP_LEGEND_DATA.map(renderLegendItem)}
    </Box>
  )
}

export default memo(MapLegend)
