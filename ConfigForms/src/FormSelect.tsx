import { Controller } from "react-hook-form"
import type { BaseFieldProps, Option } from "./App.types"

interface FormSelectProps<T extends Record<string, any>> extends BaseFieldProps<T> {
  options: Option[]
}

const FormSelect = <T extends Record<string, any>>({
  name, control, label, options,
}: FormSelectProps<T>) => (
  <div>
    <label>{label}</label>

    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <select {...field}>
            <option value="">Select</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {fieldState.error && <p>{fieldState.error.message}</p>}
        </>
      )}
    />
  </div>
)

export default FormSelect
