import React, {memo, useState} from 'react';
import {ComposableMap, Geographies, Geography, Graticule} from 'react-simple-maps';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import WorldIcon from '@material-ui/icons/Public';
import WorldLockIcon from '@material-ui/icons/VpnLockSharp';

import MapPopover from './MapPopover';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  controlButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateY(-50%)'
  },
  buttonContainer: {
    '& button + button': {
      marginLeft: 15,
    }
  }
}, {name: 'MapChart'});

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({setTooltipContent}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [position, setPosition] = useState({coordinates: [0, 0], zoom: 120});
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState(null);
  const [isWorldMapType, setIsWorldMapType] = useState(true)

  const handleZoomIn = () => {
    if (position.zoom >= 600) return;

    setPosition(pos => ({...pos, zoom: pos.zoom * 1.5}));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 100) return;

    setPosition(pos => ({...pos, zoom: pos.zoom / 1.5}));
  }

  const handleClick = (event, geo) => {
    const { properties: { ISO_A2: countryCode, NAME: countryName} } = geo

    setAnchorEl(event.currentTarget);

    setPopoverContent(`${countryCode} ${countryName}`)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleWorldMapClick = () => {
    setIsWorldMapType(true)
  }

  const handleUSAMapClick = () => {
    setIsWorldMapType(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<WorldIcon />}
          onClick={handleWorldMapClick}
        >
          World Map
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<WorldLockIcon />}
          conClick={handleUSAMapClick}
        >
          For USA citizens
        </Button>
      </div>
      <ComposableMap
        projectionConfig={{
          center: position.coordinates,
          scale: position.zoom
        }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.5}/>
        <Geographies geography={geoUrl}>
          {({geographies}) =>
            geographies.map(geo => {

              return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={(event) => handleClick(event, geo)}onMouseEnter={() => {
                    const {NAME, POP_EST} = geo.properties;
                    setTooltipContent(`${NAME} — ${POP_EST}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: theme.palette.map.default,
                      outline: "none",
                      stroke:  theme.palette.map.border,
                    },
                    hover: {
                      fill: theme.palette.warning.light,
                      outline: "none",
                    },
                    pressed: {
                      fill: theme.palette.warning.light,
                      outline: "none",
                    }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <MapPopover anchorEl={anchorEl} onClose={handleClose} content={popoverContent}/>
      <div className={classes.controlButtons}>
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(MapChart);
