import {
  createTheme,
  filledInputClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses,
} from '@mui/material'
import { Check, Circle } from '@mui/icons-material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    btnCancel: true
    btnAlternative: true
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    warningPopover: true
    alertPopover: true
  }
}

export function createComponents(): any {
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'btnCancel' },
            style: {},
          },
          {
            props: { variant: 'btnAlternative' },
            style: {},
          },
        ],
      },
      MuiAlert: {
        variants: [
          {
            props: { variant: 'warningPopover' },
            style: {},
          },
          {
            props: { variant: 'alertPopover' },
            style: {},
          },
        ],
      },
    },
  })

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: 14,
          minHeight: 46,
          height: 46,
          color: 'var(--white-base)',
          borderRadius: 'var(--button-border-radius)',
          textTransform: 'none',
          backgroundColor: 'var(--button-default-background)',
          '&:hover': {
            backgroundColor: 'var(--button-default-background-hover)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--button-cancel-background)',
            color: 'var(--white-base)',
          },
          minWidth: '160px',
          [customTheme.breakpoints.down('sm')]: {
            lineHeight: 1.25,
          },
        },
        outlined: {
          color: 'var(--primary-color) !important',
          backgroundColor: 'var(--button-outlined-background)',
          borderColor: 'currentColor !important',
          '&:hover': {
            backgroundColor: 'var(--button-outlined-background-hover)',
            color: 'var(--white-base) !important',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--button-default-background-hover)',
            color: 'var(--white-base) !important',
          },
        },
        btnCancel: {
          color: 'var(--error-color)',
          border: '1px solid var(--error-color) !important',
          backgroundColor: '#FFF6F5',
          '&:hover': {
            backgroundColor: '#C93A2B',
            color: 'var(--white-base)',
          },
        },
        btnAlternative: {
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--white-base)',

          '&:hover': {
            backgroundColor: 'var(--darker-secondary-color)',
            border: '1px solid #E82AB3',
          },
        },
        sizeSmall: {
          padding: '11px 16px',
          minWidth: '122px',
        },
        sizeMedium: {
          padding: '10px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 30px',
        },
        textSizeLarge: {
          padding: '12px 38px',
        },
        containedSecondary: {
          backgroundColor: 'var(--button-contained-secondary-background)',
          color: 'var(--button-contained-secondary-color)',
          '&:hover': {
            backgroundColor: 'var(--button-contained-secondary-background-hover)',
            color: 'var(--button-contained-secondary-color-hover)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: '5px',
          background: '#B2B2B2',
        },
        bar: {
          background: 'var(--primary-color)',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'var(--primary-color)',
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .Mui-selected ': {
            backgroundColor: 'var(--primary-color) !important',
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          textWrap: 'wrap !important',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root ': {
            fontSize: '12px !important',
            fontWeight: 400,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'var(--primary-color) !important',
        },
        root: {
          fontFamily: 'var(--main-font) !important',
          '& .MuiTab-root ': {
            color: 'var(--text-color) !important',
            '&.Mui-selected': {
              color: 'var(--primary-color) !important',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiModal-backdrop': {
            background: 'transparent !important',
          },
        },
        paperAnchorDockedBottom: {
          zIndex: '5001 !important',
          minHeight: 400,
          maxHeight: '50vh',
          padding: 40,
          background: '#F6F7F8',
          width: 'calc(100vw - var(--sidebar-width)) !important',
          left: 'auto !important',
          right: '0 !important',
          borderTop: '1px solid #D9D9D9',
        },
        paper: {
          zIndex: '5001 !important',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: 30,
          height: 30,
          borderRadius: '50%',
          '& .MuiSvgIcon-root': {
            fontSize: '18px',
          },
        },
        colorPrimary: {
          color: 'var(--primary-color)',
        },
        colorInfo: {
          background: 'var(--lightest-primary-color)',
          color: 'var(--primary-color)',
          '&:hover': {
            background: 'var(--light-primary-color)',
          },
        },
        colorSecondary: {
          color: 'var(--secondary-color)',
        },
        sizeSmall: {
          '& .MuiSvgIcon-root': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 6000,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 700,
          minWidth: '70px',
          height: '24px',
          fontSize: '12px',
        },
        colorError: {
          backgroundColor: 'var(--chip-background-error)',
          color: 'var(--chip-color-error)',
        },
        colorSuccess: {
          backgroundColor: 'var(--chip-background-success)',
          color: 'var(--chip-color-success)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'var(--text-color)',
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          width: 'fit-content',
          fontWeight: 700,
          fontSize: 14,
        },
        body2: {
          color: 'red',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          fontFamily: 'var(--main-font)',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: 'var(--primary-color)',
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: 'var(--lightest-text-color) !important',
            fontSize: 14,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`legend`]: {
            width: '0',
          },
          borderColor: 'var(--input-border-color)',
          borderRadius: 'var(--input-border-radius) !important',
          marginTop: 5,
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            '&::after': {
              borderBottom: 'none !important',
            },
            '&::before': {
              borderBottom: 'none !important',
            },
          },
        },
        multiline: {
          borderRadius: 'var(--input-border-radius)',
          minHeight: '155px !important',
        },
        input: {
          '&::placeholder': {
            fontWeight: 400,
            fontSize: '12px !important',
            color: 'var(--input-placeholder-color) !important',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root': {
            color: 'var(--lightest-text-color)',
            marginLeft: '0 !important',
          },

          '& .MuiSvgIcon-root': {
            fontSize: '19px !important',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          margin: 0,
          marginRight: '3px',
        },
        inputRoot: {
          '&.Mui-disabled': {
            '& .MuiAutocomplete-endAdornment': {
              display: 'none',
            },
          },
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '10px 16px',
          display: 'flex',
          alingItems: 'center',
          '&:focus': {
            borderRadius: 'var(--input-border-radius)',
            display: 'flex',
            alingItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            '&::after': {
              borderBottom: 'none !important',
            },
            '&::before': {
              borderBottom: 'none !important',
            },
          },
        },
        underline: {
          '&:before': {
            borderBottom: '0px solid #D9D9D9 !important',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '0px solid var(--light-text-color) !important',
          },
          '&.Mui-focused:after': {
            borderBottom: '0px solid var(--primary-color) !important',
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 400,
          '&::placeholder': {
            color: 'var(--input-placeholder-color) !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 46,
          borderColor: 'var(--input-border-color)',
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'var(--input-bg-color) !important',
          height: 'fit-content !important',
          maxHeight: 'max-content',
          '&:hover': {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-border-color)',
              borderWidth: 1,
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-border-color-focused)',
              borderWidth: 1,
            },
          },
          [`&.${outlinedInputClasses.disabled}`]: {
            backgroundColor: 'transparent !important',
            borderWidth: '0 !important',
            padding: '0 !important',
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-border-color)',
              borderWidth: 0,
              padding: '0 !important',
            },
            [`& .Mui-disabled`]: {
              opacity: '1 !important',
            },
            [`& .MuiChip-root`]: {
              '& .MuiSvgIcon-root': {
                display: 'none',
              },
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--error-color) !important',
            },
          },
          '& .MuiSvgIcon-root': {
            fontSize: '18px !important',
            color: 'var(--lightest-text-color)',
          },
          '& .MuiSelect-select': {
            paddingTop: '0 !important',
            paddingBottom: '0 !important',
            '& .Mui-disabled': {
              padding: '0 !important',
            },
            '~ .Mui-disabled': {
              display: 'none !important',
            },
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        multiline: {
          borderRadius: '21px !important',
          minHeight: '155px !important',
        },
        notchedOutline: {
          borderColor: 'var(--input-border-color)',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          minHeight: 46,
          borderColor: 'var(--input-border-color)',
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
          borderBottom: 'none !important',
          height: 46,
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '0 16px',
          display: 'flex',
          alingItems: 'center',
          '&:focus': {
            borderRadius: 'var(--input-border-radius)',
            display: 'flex',
            alingItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
          },
        },
        notchedOutline: {
          borderColor: 'var(--input-border-color)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          position: 'relative !important',
          top: '14px !important',
          left: '-2px !important',
          fontSize: '16px !important',
          fontWeight: 700,
          color: 'var(--text-color) !important',
          transform: 'translate(3px, -9px) scale(0.75) !important',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '&  .Mui-selected': {
            background: 'var(--white-base) !important',
            border: '1px solid var(--primary-color) !important',
            color: 'var(--primary-color) !important',
            fontWeight: 700,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06)',
          border: 'none',
          borderRadius: '8px',
          height: 28,
          minHeight: 28,
          minWidth: 28,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 10,
          width: 28,

          '&  .Mui-selected': {
            background: 'var(--white-base)',
            border: '1px solid var(--primary-color) !important',
          },
        },
        icon: {
          fontSize: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          minHeight: '50px',
          paddingRight: 0,
          textTransform: 'none',
          '& + &': {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: 'unset',
          borderRadius: 16,
          borderCollapse: 'separate',
          overflow: 'hidden',
          border: '1px solid var(--table-border)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          fontSize: 14,
          fontWeight: 400,
          fontFamily: 'var(--main-font)',
          borderTop: '1px solid var(--table-border)',
          padding: '0 16px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          border: 'none',
          [`& .${tableCellClasses.root}`]: {
            border: 'none',
            background: 'var(--lightest-primary-color)',
            color: 'var(--text-color)',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.5,
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 45,
          minHeight: '100%',
        },
        head: {
          height: 45,
          minHeight: '100%',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '0px 10px !important',
          marginTop: '4px !important',
          fontSize: '10px !important',
          '&.Mui-error': {
            color: 'var(--error-color) !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        fontWeight: 700,
        color: 'var(--text-color) !important',
        h1: {
          fontSize: '28px',
          [customTheme.breakpoints.down('sm')]: {
            fontSize: '22px',
          },
        },
        h2: {
          fontSize: '20px',
          lineHeight: '24px',
          marginBottom: '16px',
        },
        h3: {
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '24px',
          color: 'var(--primary-color)',
          whiteSpace: 'pre',
        },
        caption: {
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '30px',
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        loadingPosition: 'end',
      },
      disabled: {
        backgroundColor: 'unset',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 !important',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          marginBottom: 3,
          gap: '10px',
          flexDirection: 'row-reverse',
          minHeight: 'fit-content !important',
          padding: '0 !important',

          '& .Mui-checked': {
            background: 'var(--primary-color) !important',
            color: 'var(--white-base) !important',
            borderColor: 'var(--primary-color) !important',
          },
        },
        expandIconWrapper: {
          position: 'absolute',
          right: '0',
          '& .MuiSvgIcon-root': {
            color: 'var(--primary-color) !important',
          },
        },
        content: {
          margin: '0 !important',
          marginRight: '34px !important',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <div></div>,
        checkedIcon: <Check />,
      },
      styleOverrides: {
        root: {
          border: '1px solid #808080',
          borderRadius: 4,
          height: 18,
          width: 18,
          '&.Mui-checked': {
            backgroundColor: 'var(--primary-color)',
          },
          '& .MuiSvgIcon-root': {
            fontSize: 14,
          },
        },
        colorPrimary: {
          color: 'var(--primary-color) !important',
          '&.Mui-checked': {
            color: 'var(--white-base) !important',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 30,
          padding: 10,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          [customTheme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 20,
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <div></div>,
        checkedIcon: <Circle />,
      },
      styleOverrides: {
        root: {
          border: '1px solid #808080',
          height: 24,
          width: 24,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
          },
        },
        colorPrimary: {
          color: 'var(--primary-color) !important',
        },
      },
    },
    MuiStandardInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'none !important',
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '0 16px',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          zIndex: 3000,
          background: 'var(--primary-color)',
          right: 40,
          bottom: 40,

          '&:hover': {
            backgroundColor: 'var(--primary-hover-color) !important',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        warningPopover: {
          border: '1px solid #F68924',
          borderRadius: '9px',
          padding: 0,
          display: 'flex',
          height: '35px',
          alingItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#FFF8F2',
          color: 'var(--text-color)',
          '& .MuiAlert-message': {
            padding: '0',
            overflow: 'hidden',
            alingSelf: 'center',
            fontSize: '12px',
          },
          '& .MuiAlert-icon': {
            display: 'none',
          },
        },
        alertPopover: {
          border: '1px solid #C93A2B',
          borderRadius: '9px',
          padding: 0,
          display: 'flex',
          height: '35px',
          alingItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#FFF6F5',
          color: 'var(--text-color)',
          '& .MuiAlert-message': {
            padding: '0',
            overflow: 'hidden',
            alingSelf: 'center',
            fontSize: '12px',
          },
          '& .MuiAlert-icon': {
            display: 'none',
          },
        },
      },
    },
  }
}
