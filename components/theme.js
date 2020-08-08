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
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      text: '#737373',
      contrastText: '#FFF',
      title: '#474747',
      border: '#BFBFBF',
    },
    secondary: {
      main: '#737373',
      border: '#DDDDDD',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
    },
    background: {
      default: '#fff',
      footerBottom: '#EEEEEE',
      footerTop: '#FAFAFA',
    },
    map: {
      default: '#eaeaea',
      border: '#ddd',
    },
  },
})

export default theme
