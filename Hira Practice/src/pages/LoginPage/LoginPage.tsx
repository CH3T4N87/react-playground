import { useForm } from "react-hook-form"
import type { LoginData, OTPData, OTPShape } from "./LoginPage.types"
import FormInput from "@/components/Form/FormInput/FormInput";
import Button from "@/components/Button/Button";
import styles from "./LoginPage.module.scss";
import { snack } from "@/components/Snackbar/useSnackbarStore";
import { useEffect, useReducer, useState } from "react";
import { MultiClass } from "@/utility/classResolve";
import { useGetOTPMutation, useVerifyOTPMutation } from "@/redux/slices/otpApiSlice";
import Typography from "@/components/Typography/Typography";
import { jwtDecode } from "jwt-decode";
import type { User } from "@/context/types";
import { OTPReducer } from "./LoginPage.states";
import Form from "@/components/Form/Form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { login } from "@/redux/slices/authSlice";

const LoginPage = () => {

    const [isOTPSentR, setIsOTPSentR] = useReducer(OTPReducer, false);
    const [seconds, setSeconds] = useState(0);

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();


    const [getOTP, { isLoading: getOTPLoading }] = useGetOTPMutation();
    const [verifyOTP, { isLoading: verifyOTPLoading }] = useVerifyOTPMutation();

    useEffect(() => {
        if (!seconds) return;
        const timer = setTimeout(() => {
            setSeconds(seconds - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [seconds]);

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);

    const sendOTP = () => {
        setSeconds(59);
    };




    const methods = useForm<LoginData & OTPShape>({ defaultValues: { email: "", otp: "" } });

    const onSubmit = async (data: LoginData & OTPShape) => {

        try {
            if (!isOTPSentR) {
                const response = await getOTP(data as LoginData).unwrap();
                snack.success(response.message || "OTP sent successfully");
                setIsOTPSentR({ type: "TOGGLE_OTP_STATE" });
                sendOTP();
                return;
            }

            const otpData: OTPData = {
                email: data.email,
                entered_otp: Number(data.otp)
            }
            const response = await verifyOTP(otpData).unwrap();
            const user: User = jwtDecode(response.access_token!);
            dispatch(login({ user, token: response.access_token! }));
            snack.success(response.message || "OTP verified successfully");
            navigate("/dashboard");

        } catch (e: any) {
            console.log(e);
            snack.error(e.data?.detail.message || e?.error || "Something went wrong !");
        }

    }

    const onResend = async () => {
        try {
            const currentEmail = methods.getValues('email');
            await getOTP({ email: currentEmail } as LoginData).unwrap();
            snack.success('OTP resent successfully');
            sendOTP();
        } catch (e: any) {
            snack.error(e.data?.detail || 'Failed to resend OTP');
        }
    };

    return (
        <Form methods={methods} onSubmit={onSubmit} className={MultiClass([styles.form, styles.loginForm])}>
            {
                !isOTPSentR ? (
                    <FormInput
                        name="email"
                        placeholder="Enter your email"
                        label="Email"
                    rules={{
                        required: "Please enter your email",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address"
                        }
                    }}
                    />
                ) : (
                    <>
                        <FormInput
                            name="otp"
                            placeholder="Enter the OTP"
                            label="OTP"
                            rules={{
                                required: "Please enter the OTP",
                                pattern: {
                                    value: /^\d{4}$/,
                                    message: "OTP should contain exactly 4 digits"
                                }
                            }}
                        />
                        <div className={styles.timeNresendOTPContainer}>

                            {
                                (seconds === 0) ? (
                                    <Button onClick={onResend} type="button">Resend OTP</Button>
                                ) : (
                                    <Typography variant="label">{seconds} secs</Typography>
                                )
                            }
                        </div>
                    </>
                )
            }

            <Button type="submit" variant="primary" disabled={getOTPLoading}>{isOTPSentR ? (verifyOTPLoading ? "Verifying..." : "Verify") : (getOTPLoading ? "Sending....." : "Send OTP")}</Button>
            {isOTPSentR && <span className={styles.changeEmailTag} onClick={() => setIsOTPSentR({ type: "TOGGLE_OTP_STATE" })}>change email</span>}
        </Form>
    )
}

export default LoginPage