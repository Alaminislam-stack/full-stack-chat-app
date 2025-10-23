import { useEffect } from "react"
import { Button } from "./components/ui/button"
import Route from "./routes/Route"
import { useDispatch } from "react-redux"
import { userProfileThunk } from "./store/silce/user/user.thunk"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(userProfileThunk())
    })()
  },[])
   
  return (
    <>
      <Route />
    </>
  )
}

export default App
