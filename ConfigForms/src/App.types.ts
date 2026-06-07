import type { Control, FieldValues, Path } from "react-hook-form";

export interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>,
  label: string,
}