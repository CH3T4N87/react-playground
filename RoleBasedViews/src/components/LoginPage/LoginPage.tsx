import { useReducer, type ChangeEvent, type SyntheticEvent } from "react"
import type { LoginCredentials, LoginCredentialsAction, LoginPageProps } from "./LoginPage.types"
import { Roles } from "../../App.types"

const loginCredentialsReducer = (state: LoginCredentials, action: LoginCredentialsAction): LoginCredentials => {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}

const initialState: LoginCredentials = {
    email: "",
    password: ""
}
const LoginPage = ({ loginStateDispatch }: LoginPageProps) => {
    const [loginCredentials, updateLoginCredentials] = useReducer(loginCredentialsReducer, initialState);
    const { email, password } = loginCredentials;

    const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        //if successfull login
        loginStateDispatch({
            type: "LOGIN_SUCCESS",
            user: {
                id: 234,
                name: "Chetan Kshirsagar",
                role: Roles.USER
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => {
                            updateLoginCredentials({ type: "SET_FIELD", field: "email", value: e.target.value })
                        }
                    } />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => {
                            updateLoginCredentials({ type: "SET_FIELD", field: "password", value: e.target.value })
                        }
                    } />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage