import { FormProvider, useForm } from "react-hook-form";
import styles from "./SetPasswordPage.module.scss";
import setPassSvg from "@/assets/set-password-side.svg";
import FormInput from "@/components/Form/FormInput/FormInput";
import Button from "@/components/Button/Button";
import { snack } from "@/components/Snackbar/useSnackbarStore";
import { useSearchParams } from "react-router-dom";
import type { SetPassword, SetPasswordShape } from "./SetPasswordPage.types";
import { useSetPasswordMutation } from "@/redux/slices/passwordApiSlice";



const SetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [setPassword, { isLoading }] = useSetPasswordMutation();
  const defaultValues: SetPassword = {
    password: "",
    confirmPassword: ""
  }
  const methods = useForm<SetPassword>({ defaultValues });

  const onSubmit = async (data: SetPassword) => {
    if (data.password !== data.confirmPassword) {
      snack.error("Password mismatch, please  recheck.")
      return;
    }
    const passwordData: SetPasswordShape = {
      token: searchParams.get("token")!,
      email: searchParams.get("email")!,
      password: data.password
    }
    try {
      const response = await setPassword(passwordData).unwrap();
      snack.success(response.message || "Password set succesfully.")
      window.location.href = "/";
    } catch (e: any) {
      snack.error(e.data?.details || "Something went wrong !");
    }
  }

  return (
    <div className={styles.setPasswordPage}>
      <div className={styles.leftSection}>
        <img src={setPassSvg} alt="set password img" className={styles.sideImg} />
      </div>
      <div className={styles.rightSection}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.setPassForm}>
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password here.."
              rules={{
                required: "please enter the password",
                minLength: {
                  value: 8,
                  message: "Password should be minimum of 8 characters."
                },
                maxLength: {
                  value: 30,
                  message: "Password can't be longer than 30 characters."
                }
              }}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password here.."
              rules={{
                required: "please confirm your password",
                minLength: {
                  value: 8,
                  message: "Password should be minimum of 8 characters."
                },
                maxLength: {
                  value: 30,
                  message: "Password can't be longer than 30 characters."
                }
              }}
            />

            <div className={styles.formButtonsContainer}>
              <Button variant="primary" type="submit">{isLoading ? "Confirming...": "Confirm"}</Button>
              <Button type="reset">Reset</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SetPasswordPage