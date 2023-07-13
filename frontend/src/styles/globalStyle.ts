import { createGlobalStyle } from 'styled-components';
import resetStyle from './reset';

const GlobalStyles = createGlobalStyle`
  ${resetStyle}

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;

export default GlobalStyles;
