import React, {memo, useState} from 'react';
import {ComposableMap, Geographies, Geography, Graticule} from 'react-simple-maps';

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
  const [position, setPosition] = useState({coordinates: [0, 0], zoom: 100});

  function handleZoomIn() {
    if (position.zoom >= 400) return;

    setPosition(pos => ({...pos, zoom: pos.zoom * 1.2}));
  }

  function handleZoomOut() {
    if (position.zoom <= 100) return;

    setPosition(pos => ({...pos, zoom: pos.zoom / 1.2}));
  }

  return (
    <>
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
      <div>
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
    </>
  );
};

export default memo(MapChart);
