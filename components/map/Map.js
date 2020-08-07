import React, { useState, memo} from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from './MapChart';

function Map() {
    const [content, setContent] = useState("");
    return (
        <div>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}

export default memo(Map)
