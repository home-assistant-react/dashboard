export interface ColorWheelProps {
  size: number;
  onChange?: (color: [number, number]) => void;
  onChangeFinal?: (color: [number, number]) => void;
  selectedColor?: [number, number];
  brightness?: number;
}
