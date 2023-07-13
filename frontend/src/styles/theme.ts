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
    studying: color.red,
    retrospect: color.teal,
  },
  border: {
    primary: color.blue[500],
    secondary: color.neutral[200],
    studying: color.red,
    retrospect: color.teal,
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
    studying: color.red,
    retrospect: color.teal,
  },
  border: {
    primary: color.blue[500],
    secondary: color.neutral[200],
    studying: color.red,
    retrospect: color.teal,
  },
};
