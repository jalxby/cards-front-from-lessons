import { Counter } from "./features/counter/Counter"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { appActions } from "@/features/app/app.slice"
import { authThunks } from "@/features/auth/auth.slice"
import { toast, ToastContainer } from "react-toastify"

export const Test = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  function handleErrorButtonClicked() {
    toast.success("something's gone right")
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 1000)
  }, [dispatch])

  const handleLoginClicked = () => {
    dispatch(
      authThunks.login({
        email: "andres99.dev@gmail.com",
        password: "123123123",
        rememberMe: true,
      }),
    )
      .unwrap()
      .then(() => navigate("/hello"))
      .catch((err) => console.warn(err))
  }

  return (
    <div>
      <button onClick={handleLoginClicked}>login</button>
      <button
        onClick={() => {
          dispatch(
            authThunks.register({
              email: "andres999.dev@gmail.com",
              password: "123123123",
            }),
          )
        }}
      >
        register
      </button>
      <button onClick={handleErrorButtonClicked}>create error</button>
      {!!error && <h2>{error}</h2>}
      <Counter />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Test />,
    path: "/",
  },
  {
    element: <div>hello</div>,
    path: "/hello",
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <div>protected</div>,
      },
    ],
  },
])

const theme = createTheme()
function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <LinearProgress />}
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
function ProtectedRoute() {
  const isAuthed = useAppSelector((state) => state.auth.isAuthed)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthed === null) return

    if (!isAuthed) navigate("/")
  }, [isAuthed, navigate])

  if (!isAuthed) return null

  return <Outlet />
}

export default App
