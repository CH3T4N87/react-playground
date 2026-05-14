import { useReducer } from "react"
import type { LoginAction, LoginState } from "./App.types"
import LoginPage from "./components/LoginPage/LoginPage"
import DashboardShell from "./components/DashboardShell/DashboardShell"

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch(action.type){
    case "LOGIN_SUCCESS":
      return {
          isAuthenticated: true,
          user: action.user
      }
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null
      }
  }
  return state
}

const initialState: LoginState = {
  isAuthenticated: false,
  user: null
}
const App = () => {
  const [loginState, updateLoginState] = useReducer(loginReducer, initialState);
  const { user, isAuthenticated } = loginState;
  return (
    <div>
      <LoginPage loginStateDispatch={updateLoginState}/>
      {
        isAuthenticated && <DashboardShell user={user!} loginStateDispatch={updateLoginState}/>
      }
    </div>
  )
}

export default App