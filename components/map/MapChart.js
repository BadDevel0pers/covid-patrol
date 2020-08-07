import React, {memo, useState} from 'react';
import {ComposableMap, Geographies, Geography, Graticule} from 'react-simple-maps';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mapContainer: {
    position: 'relative',
  },
  controlButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateY(-50%)'
  }
});

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({setTooltipContent}) => {
  const classes = useStyles();
  const [position, setPosition] = useState({coordinates: [0, 0], zoom: 120});

  function handleZoomIn() {
    if (position.zoom >= 400) return;

    setPosition(pos => ({...pos, zoom: pos.zoom * 1.5}));
  }

  function handleZoomOut() {
    if (position.zoom <= 100) return;

    setPosition(pos => ({...pos, zoom: pos.zoom / 1.5}));
  }

  return (
    <div className={classes.mapContainer}>
      <ComposableMap
        projectionConfig={{
          center: position.coordinates,
          scale: position.zoom
        }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.5}/>
        <Geographies geography={geoUrl}>
          {({geographies}) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const {NAME, POP_EST} = geo.properties;
                  setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
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
