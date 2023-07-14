import color from './color';

export const lightTheme = {
  text: {
    primary: color.black,
    secondary: color.neutral[400],
    accent: color.yellow,
  },
  background: {
    basic: color.white,
    primary: color.blue[500],
    secondary: color.neutral[100],
    studying: color.red[500],
    retrospect: color.teal[500],
  },
  hoverBackground: {
    basic: color.neutral[50],
    primary: color.blue[600],
    secondary: color.neutral[200],
    studying: color.red[600],
    retrospect: color.teal[600],
  },
  border: {
    primary: color.blue[500],
    secondary: color.neutral[200],
    studying: color.red[500],
    retrospect: color.teal[500],
  },
};

export const darkTheme = {
  text: {
    primary: color.black,
    secondary: color.neutral[400],
    accent: color.yellow,
  },
  background: {
    basic: color.black,
    primary: color.blue[500],
    secondary: color.neutral[800],
    studying: color.red[500],
    retrospect: color.teal[500],
  },
  hoverBackground: {
    basic: color.neutral[50],
    primary: color.blue[600],
    secondary: color.neutral[200],
    studying: color.red[600],
    retrospect: color.teal[600],
  },
  border: {
    primary: color.blue[500],
    secondary: color.neutral[200],
    studying: color.red[500],
    retrospect: color.teal[500],
  },
};
