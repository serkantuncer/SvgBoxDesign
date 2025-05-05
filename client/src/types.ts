export interface BoxDimensions {
  a: number;
  b: number;
  h: number;
  materialThickness: number;
  modelType: number;
  featureType: FeatureType;
  z: number;
  f: number;
  g: number;
  c: number;
  askiType?: number;
  dilType?: number;
  parmakType?: number;
  m1?: number;
  m4?: number;
  d?: number;
  r1?: number;
}

export type FeatureType = 'Normal' | 'Aski' | 'Dil' | 'Parmak';

export interface MaterialOption {
  label: string;
  value: number;
}

export interface TransformState {
  scale: number;
  translateX: number;
  translateY: number;
}

export interface SvgLineElement {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeDasharray?: string;
  style?: string;
}

export interface SvgPathElement {
  d: string;
  stroke: string;
  fill: string;
}

export interface BoxDesign {
  id?: number;
  name: string;
  dimensions: BoxDimensions;
  svg: string;
  createdAt?: Date;
  updatedAt?: Date;
}
