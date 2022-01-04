import 'styled-components/native';

export interface IColors {
  primary: string;
  secondary: string;

  background: string;

  text: string;
  danger: string;
  info: string;
  success: string;
  warn: string;
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    title: string;

    colors: IColors;
  }
}
