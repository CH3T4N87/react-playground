import type { User } from "../../App.types";

// UserForm.types.ts
export type FormMode = "add" | "edit";

export interface UserFormProps {
  mode: FormMode;
  initialData?: User;  // Required for edit, optional for add
  onSubmit: (data: User) => void;
  onCancel: () => void;
  isLoading?: boolean;
}