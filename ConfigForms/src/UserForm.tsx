import { FormProvider, useForm } from "react-hook-form"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"

interface LoginData {
  username: string,
  role: "user" | "admin" | "",
  email: string
}


const UserForm = () => {
  const methods = useForm<LoginData>({ defaultValues: { username: "", role: "", email: "" } })
  const onSubmit = (data: LoginData) => {
    alert(JSON.stringify(data));
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>

        <FormInput
          name="username"
          label="Username"
          placeholder="Enter you username"
          rules={
            {
              required: "This field is required"
            }
          }
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="Enter you username"
          rules={
            {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid Email Address"
              }
            }
          }
        />

        <FormSelect
          name="role"
          label="Select a role"
          options={
            [
              {
                label: "Admin",
                value: "admin"
              },
              {
                label: "User",
                value: "user"
              }
            ]
          }

          rules={
            {
              required: "Please select a role"
            }
          }
        />

        <button>submit</button>

      </form>
    </FormProvider>
  )
}

export default UserForm