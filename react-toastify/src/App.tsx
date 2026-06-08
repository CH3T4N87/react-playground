import SnackbarContainer from "./SnackbarContainer"
import { snack } from "./useSnackbarStore"

const App = () => {
  return (
    <div>
      <SnackbarContainer/>
      <button onClick={() => snack.success("snackbar appeared !!")}>Success</button>
      <button onClick={() => snack.error("snackbar appeared !!")}>Error</button>
    </div>
  )
}

export default App