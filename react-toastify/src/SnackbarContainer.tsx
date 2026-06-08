import { v4 } from "uuid";
import { useSnackstore } from "./useSnackbarStore"

const SnackbarContainer = () => {
    const snaps = useSnackstore();
  return (
    <div>
        {
            snaps.map(s => <span key={v4()} className={s.type}>{s.message}</span>)
        }
    </div>
  )
}

export default SnackbarContainer