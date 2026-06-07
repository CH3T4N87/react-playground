import type { Control, Path } from "react-hook-form"

export interface Option {
  label: string,
  value: string
}

export interface BaseFieldProps<T extends Record<string, any>> {
  name: Path<T>
  control: Control<T>
  label: string
}