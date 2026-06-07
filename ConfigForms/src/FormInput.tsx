import { type RegisterOptions, type Path, Controller, type FieldValues, useFormContext } from "react-hook-form";
import type { BaseFieldProps } from "./App.types";
import type { HTMLInputTypeAttribute } from "react";
import FormField from "./FormField";

interface FileInputProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  rules?: RegisterOptions<T, Path<T>>
}

const FormInput = <T extends FieldValues>({ name, label, type = "text", placeholder, rules }: FileInputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) =>
          <FormField
            label={label}
            required={!!rules?.required}
            error={error?.message}
          >
            <input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
            />
          </FormField>
        }
      />
    </div>
  )
}

export default FormInput