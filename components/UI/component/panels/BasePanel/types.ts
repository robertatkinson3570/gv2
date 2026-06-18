export interface Inheritance {
  width?: boolean;
  height?: boolean;
}

export interface SideVisibility {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
}

export interface SecondarySideConfig {
  size?: number;
  thickness?: number;
  spacing?: number;
  shadow?: boolean;
  color?: string;
}

export interface SideConfig {
  color?: string;
  size?: number;
  top?: number; // top cap width and height in px
  right?: number; // inherits height from content box
  bottom?: number; // bottom cap width and height in px
  left?: number; // inherits height from content box
  thickness?: number; // border thickness
  secondarySides?: SecondarySideConfig | boolean;
}

export interface Title {
  value: string;
  color?: string;
  borderSize?: number;
  background?: string;
  fontSize?: number;
  fontFamily?: 'Pixelar' | 'Alien Encounters Solid';
  width?: string;
  padding?: string;
  hasShadow?: boolean;
  component?: React.ReactNode;
}

export interface Content {
  padding?: number; // inside container padding
  color?: string; // content text color
  scrollable?: boolean;
}

export interface ScanlineConfig {
  color?: string;
  size?: number;
  spacing?: number;
  opacity?: number;
}

export interface Background {
  color?: string;
  opacity?: number;
  shadow?: string;
  hasShadow?: boolean;
  scanlines?: boolean | string | ScanlineConfig;
}
