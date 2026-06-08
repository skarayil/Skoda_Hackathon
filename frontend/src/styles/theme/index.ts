import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    skoda: {
      green: '#4da944',
      greenDark: '#3a8234',
      greenLight: '#6bc05f',
      navy: '#0d1b2a',
      navyLight: '#1a2f42',
      sand: '#f6f7f8',
      sandDark: '#e8eaec',
    },
    brand: {
      50: '#e8f5e6',
      100: '#c3e5bf',
      200: '#9dd595',
      300: '#77c56b',
      400: '#5bb84c',
      500: '#4da944',
      600: '#459a3d',
      700: '#3a8234',
      800: '#306b2b',
      900: '#1f4619',
    },
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'skoda.sand',
        color: 'skoda.navy',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'skoda.green',
          color: 'white',
          _hover: {
            bg: 'skoda.greenDark',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'lg',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: 'gray.200',
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'md',
        px: 2,
        py: 0.5,
        fontSize: 'xs',
        fontWeight: 600,
      },
    },
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
});

export default theme;
