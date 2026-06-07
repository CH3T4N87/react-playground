import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

interface LoginFormData {
  email: string;
  password: string;
  file: File
}

const UserForm = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput<LoginFormData>
        name="email"
        control={control}
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        }}
      />

      <FormInput<LoginFormData>
        name="password"
        control={control}
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

     
      <button type="submit">Login</button>
    </form>
  )
}

export default UserForm