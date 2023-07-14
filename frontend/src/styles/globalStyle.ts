import { createGlobalStyle } from 'styled-components';
import resetStyle from './reset';
import '../fonts/font.css';

const GlobalStyles = createGlobalStyle`
  ${resetStyle}

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: "S-Core Dream";
    font-weight: 300;
  }
`;

export default GlobalStyles;
