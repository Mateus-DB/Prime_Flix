import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
function App() {


  return (
    <> 
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
