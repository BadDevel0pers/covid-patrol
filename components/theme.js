import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 991,
      xl: 1600,
    },
  },
  margins: {
    row: 15,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '24px',
        padding: '8px 5px',
      },
      outlined: {
        border: '1px solid #CCC',
        padding: '7px 5px',
      },
      sizeLarge: {
        fontSize: '18px',
        lineHeight: '26px',
        padding: '13px 22px',
      },
      contained: {
        fontWeight: 'bold',
        boxShadow: 'none',
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
      containedSizeLarge: {
        fontSize: '18px',
        lineHeight: '26px',
        padding: '13px 22px',
      },
      containedPrimary: {
        color: '#fff',
        backgroundColor: '#737373',
        '&.Mui-disabled': {
          color: '#fff',
        },
      },
    },
    MuiContainer: {
      maxWidthLg: {
        '@media (min-width: 991px)': {
          maxWidth: '1170px',
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        flex: '1 0 auto',
        body: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
        html: {
          height: '100%',
          minHeight: '100%',
        },
        '#__next': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiIconButton: {
      label: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
      },
      root: {
        padding: 0,
      },
    },
    MuiInput: {
      root: {
        height: '35px',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '7px 10px',
        background: '#FFF',
        border: '1px solid #BFBFBF',
        '&:hover, &:focus': {
          border: '1px solid #BFBFBF',
        },
        '&::placeholder': {
          fontSize: '0.875rem',
          border: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
      },
    },
    MuiListItemText: {
      root: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 30,
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 10px) scale(1)',
      },
    },
    MuiSelect: {
      outlined: {
        borderRadius: 0,
      },
    },
  },
  palette: {
    primary: {
      main: '#EEEEEE',
      text: '#737373',
      contrastText: '#FFF',
      title: '#474747',
      border: '#BFBFBF',
      sales: '#BA2235',
      inventoryStatus: '#0E8B0B',
      lowInventory: '#8A6D3B',
    },
    secondary: {
      main: '#737373',
      border: '#DDDDDD',
    },
    error: {
      main: '#BA2235',
      secondary: '#F8E8EA',
    },
    background: {
      default: '#fff',
      footerBottom: '#EEEEEE',
      footerTop: '#FAFAFA',
    },
    brand: {
      black: '#000',
      veryLightGrey: '#CCC',
      charcoal: '#474747',
      whiteSmoke: '#F5F5F5',
      gainsboro: '#E3E3E3',
      nero: '#222',
      midnight: '#1C2F41',
      transparent: 'rgba(255, 255, 255, 0)', // for a correct render on iOS
    },
    rating: '#E8B620',
  },
})

export default theme
