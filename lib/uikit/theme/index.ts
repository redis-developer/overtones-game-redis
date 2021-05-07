import { css } from "styled-components";
import Theme from "../types/theme";
import { addAlpha } from "../utils";

// breakpoints define the minimum width of a device (>=)
export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const colorPrimitives = {
  neutral: "#2D3C4D",
  neutralL5: "#9DB8CE",
  neutralL10: "#E6E6E6",
  neutralL20: "#F7F7F7",
  neutralL30: "#F7F7F5",
  white: "#FFFFFF",
  blue: "#1261BC",
  green: "#84C09E",
  greenL10: "#B4D8CE",
  greenL20: "#C9E3D5",
  greenL30: "#DBEDE2",
  yellow: "#FFCE33",
  yellowL10: "#FFE095",
  yellowL20: "#FFF0C5",
  yellowL30: "#FFF6DC",
  red: "#FF7373",
  redL10: "#FF9595",
  redL20: "#FFC5C5",
  redL30: "#FFDCDC",
};

const scale = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
  72: "18rem",
};
const sizes = {
  xxs: "0.25rem",
  xs: "0.5rem",
  s: "1rem",
  m: "1.5rem",
  l: "2rem",
  xl: "3rem",
  xxl: "4rem",
};

const theme: Theme = {
  colors: {
    ...colorPrimitives,
    background: {
      white: colorPrimitives.white,
      muted: colorPrimitives.neutralL30,
    },
    text: {
      default: colorPrimitives.neutral,
      muted: colorPrimitives.neutralL5,
    },
    border: colorPrimitives.neutral,
    primary: colorPrimitives.neutral,
    accent: colorPrimitives.yellow,
    info: colorPrimitives.blue,
    warning: colorPrimitives.yellow,
    success: colorPrimitives.green,
    danger: colorPrimitives.red,
  },
  scale,
  sizes,
  borderRadius: "0.5rem",
  borderRadiusLarge: "1rem",
  boxShadow: {
    default: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
    hard: (hex = colorPrimitives.neutral, opacity = 0.2) =>
      `0 0 0 0.125rem ${addAlpha(hex, opacity)}`,
  },
  fonts: {
    default: "'Nunito', sans-serif",
    serif: "'Lora'",
  },
  fontSizes: {
    h1: "2rem",
    h2: "1.25rem",
    h3: "1.10rem",
    body: "1rem",
    small: "0.875rem",
    xsmall: "0.75rem",
  },
  fontWeights: {
    regular: 400,
    bold: 600,
    bolder: 700,
    black: 900,
  },
  transition: () => "all 0.15s ease",
  breakPoints,
  media: Object.keys(breakPoints).reduce((acc, label: string) => {
    acc[label] = (...args: any) => css`
      @media (min-width: ${breakPoints[label]}px) {
        // @ts-ignore
        ${css.call(undefined, ...args)};
      }
    `;
    return acc;
  }, {}),
  dimensions: {
    sidebarNavWidth: "18rem",
    sidebarRightWidth: "24rem",
  },
};

export default theme;
