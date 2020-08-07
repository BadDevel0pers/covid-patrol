import React, {memo, useState} from 'react';
import ReactTooltip from 'react-tooltip';
import { makeStyles } from '@material-ui/core/styles';

import MapChart from './MapChart';

const useStyles = makeStyles({
  mapRoot: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: '30vh',
  },
});


function Map() {
  const [content, setContent] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.mapRoot}>
      <MapChart setTooltipContent={setContent}/>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default memo(Map)
