import { Controller, type Control, type Path, type RegisterOptions } from "react-hook-form";
import type { BaseFieldProps } from "./App.types";

interface FormInputProps<T extends Record<string, any>> extends BaseFieldProps<T> {
  type?: string,
  placeholder?: string,
  rules?: RegisterOptions<T, Path<T>>
}

const FormInput = <T extends Record<string, any>>({ label, name, control, type, placeholder, rules }: FormInputProps<T>) => {
  return (
    <div>
      <label htmlFor={name}>{label} {rules?.required && <span>*</span>} </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) =>
          <>
            <input {...field}
              name={name}
              type={type}
              placeholder={placeholder}
              className="input-normal"
            />
            {error && <span>{error.message}</span>}
          </>
        }
      />

    </div>
  )
}

export default FormInput