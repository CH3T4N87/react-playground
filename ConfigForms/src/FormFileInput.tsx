// FormFileInput.tsx
import { Controller, type Control, type Path } from "react-hook-form";

interface FormFileInputProps<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  accept?: string;
  rules?: any;
}

const FormFileInput = <T extends Record<string, any>>({
  name,
  control,
  label,
  accept = ".pdf",
  rules
}: FormFileInputProps<T>) => {
  return (
    <div>
      <label>{label} {rules?.required && "*"}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <input
              type="file"
              accept={accept}
              onChange={(e) => onChange(e.target.files?.[0])}
            />
            {error && <span>{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default FormFileInput;