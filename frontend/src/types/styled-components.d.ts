import 'styled-components';
import { Variant } from './style';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
  }
}
