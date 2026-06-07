import { type FieldValues, type RegisterOptions, type Path, Controller, useForm, useFormContext } from "react-hook-form";
import type { BaseFieldProps } from "./App.types";

interface Option {
  label: string,
  value: string
}

interface FormSelectProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: Option[],
  rules?: RegisterOptions<T, Path<T>>
}

const FormSelect = <T extends FieldValues>({ name, label, options, rules }: FormSelectProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div>
      <label htmlFor={name}>{label} {rules?.required && <span>*</span>}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) =>
          <>
            <select id={name} {...field}>
              <option>Select a option</option>
              {
                options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
              }
            </select>
            {error && <span>{error.message}</span>}
          </>
        }
      />
    </div>
  )
}

export default FormSelect