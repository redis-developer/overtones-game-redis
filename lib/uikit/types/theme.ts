interface ColorPrimitives {
  neutral: string;
  neutralL5: string;
  neutralL10: string;
  neutralL20: string;
  neutralL30: string;
  white: string;
  blue: string;
  green: string;
  greenL10: string;
  greenL20: string;
  greenL30: string;
  yellow: string;
  yellowL10: string;
  yellowL20: string;
  yellowL30: string;
  red: string;
  redL10: string;
  redL20: string;
  redL30: string;
}

interface UIColors {
  background: {
    white: string;
    muted: string;
  };
  text: {
    default: string;
    muted: string;
  };
  border: string;

  primary: string;
  accent: string;
  info: string;
  warning: string;
  success: string;
  danger: string;
}

export interface Size {
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
}

export type ScaleKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '32'
  | '40'
  | '48'
  | '56'
  | '64'
  | '72';

interface Fonts {
  default: string;
  serif: string;
}

interface FontSize {
  h1: string;
  h2: string;
  h3: string;
  body: string;
  small: string;
  xsmall: string;
}

interface FontWeight {
  regular: number;
  bold: number;
  bolder: number;
  black: number;
}

interface Theme {
  colors: UIColors & ColorPrimitives;
  scale: Record<ScaleKey, string>;
  sizes: Size;
  borderRadius: string;
  borderRadiusLarge: string;
  boxShadow: {
    default: string;
    hard: (hex?: string, opacity?: number) => string;
  };
  fonts: Fonts;
  fontSizes: FontSize;
  fontWeights: FontWeight;
  transition: () => string;
  breakPoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  media: any;
  dimensions: {
    sidebarNavWidth: string;
    sidebarRightWidth: string;
  };
}

export default Theme;
