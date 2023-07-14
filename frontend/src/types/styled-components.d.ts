import 'styled-components';
import { Variant } from './style';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    background: {
      basic: string;
      primary: string;
      secondary: string;
      studying: string;
      retrospect: string;
    };
    hoverBackground: {
      basic: string;
      primary: string;
      secondary: string;
      studying: string;
      retrospect: string;
    };
    border: {
      primary: string;
      secondary: string;
      studying: string;
      retrospect: string;
    };
  }
}
