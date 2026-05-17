import axios from "axios";
import UserForm from "./components/UserForm/UserForm";
import type { FormMode } from "./components/UserForm/UserForm.types";
import { useState } from "react";
import type { User } from "./App.types";
import HookForm from "./components/HookForm/Hookform";

// Parent component usage
const App = () => {
  const [mode, setMode] = useState<FormMode>("edit");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = (data: User) => {
    axios.post("/api/users", data);
  };

  const handleEdit = (data: User) => {
    axios.put(`/api/users/${editingUser?.id}`, data);
  };

  return (
    <div>
      {/* <button onClick={() => { setMode("add"); setEditingUser(null); }}>
        Add User
      </button>
      
      {(mode === "add" || editingUser) && (
        <UserForm
          mode={mode}
          initialData={editingUser || undefined}
          onSubmit={mode === "add" ? handleAdd : handleEdit}
          onCancel={() => { setMode("add"); setEditingUser(null); }}
        />
      )} */}

      <HookForm/>
    </div>
  );
};

export default App;