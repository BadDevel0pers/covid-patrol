import React from 'react'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

const advisoryIcons = {
  1: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Not advisory',
  },
}

export default advisoryIcons
