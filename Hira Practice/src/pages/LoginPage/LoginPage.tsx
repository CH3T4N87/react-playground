import { FormProvider, useForm } from "react-hook-form"
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
import {  useAuth } from "@/context/AuthContext";
import type { TempUser } from "@/context/types";
import { redirectR } from "@/utility/redirection";
import { OTPReducer } from "./LoginPage.states";

const LoginPage = () => {

    const [isOTPSentR, setIsOTPSentR] = useReducer(OTPReducer, false);
    const [seconds, setSeconds] = useState(0);


    const { login, user } = useAuth();
    if(user) redirectR(user);


    const [getOTP, { isLoading: getOTPLoading }] = useGetOTPMutation();
    const [verifyOTP, { isLoading: verifyOTPLoading }] = useVerifyOTPMutation();


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prev => prev - 1);
            }
            if (seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const sendOTP = () => {
        setSeconds(59);
    };


    const methods = useForm<LoginData | OTPData>({ defaultValues: { email: "" } });

    const onSubmit = async (data: LoginData | OTPShape) => {

        try {
            if (!isOTPSentR) {
                const response = await getOTP(data as LoginData).unwrap();
                snack.success(response.message || "OTP sent successfully");
                setIsOTPSentR({ type: "TOGGLE_OTP_STATE" });
                sendOTP();
                return; 
            }

            const otpData: OTPData = {
                email: (data as LoginData).email,
                entered_otp: Number((data as OTPShape).otp)
            }

            const response = await verifyOTP(otpData).unwrap();
            const user: TempUser = jwtDecode(response.token!);
            login(user, response.token!);
            snack.success(response.message || "OTP verified successfully");

            //role based redirecting
            redirectR(user);

        } catch (e: any) {
            snack.error(e.data?.detail || "Something went wrong !");
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
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={MultiClass([styles.form, styles.loginForm])}>
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
                                        value: /[0-9]$/,
                                        message: "Invalid OTP"
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: "OTP should be of 4 digit."
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "OTP should be of 4 digit."
                                    }
                                }}
                            />
                            <div className={styles.timeNresendOTPContainer}>

                                {
                                    (seconds === 0) ? (
                                        <Button onClick={onResend} type="button">Resend OTP</Button>
                                    ) : (
                                        <Typography variant="label1">{seconds} secs</Typography>
                                    )
                                }
                            </div>
                        </>
                    )
                }

                <Button type="submit" variant="primary">{isOTPSentR ? (verifyOTPLoading ? "Verifying..." : "Verify") : (getOTPLoading ? "Sending....." : "Send OTP")}</Button>
            </form>
        </FormProvider>
    )
}

export default LoginPage