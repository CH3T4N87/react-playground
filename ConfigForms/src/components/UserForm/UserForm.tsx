// UserForm.tsx
import { useReducer, type ChangeEvent, type FormEvent } from "react";
import type { UserFormProps, FormMode } from "./UserForm.types";
import type { User } from "../../App.types";

interface FormState {
  name: string;
  email: string;
  role: string;
}

type FormAction = 
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET"; initialState: FormState };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};

const UserForm = ({ mode, initialData, onSubmit, onCancel, isLoading }: UserFormProps) => {
  const initialState: FormState = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "",
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "add" ? "Add User" : "Edit User"}</h2>
      
      <input
        value={formState.name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
        placeholder="Name"
        required
      />
      
      <input
        value={formState.email}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        placeholder="Email"
        type="email"
        required
      />
      
      <select
        value={formState.role}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "role", value: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="CUSTOMER_SUPPORT">Support</option>
      </select>
      
      <div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : mode === "add" ? "Create" : "Update"}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UserForm;