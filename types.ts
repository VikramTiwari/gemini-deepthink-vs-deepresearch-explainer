export interface SectionProps {
  isActive: boolean;
}

export interface BenchmarkData {
  name: string;
  value: number;
  color: string;
  highlight?: boolean;
}

export enum VisualType {
  BRAIN = 'BRAIN',
  BROWSER = 'BROWSER',
  HYBRID = 'HYBRID'
}