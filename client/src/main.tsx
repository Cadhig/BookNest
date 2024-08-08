import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './routes/Login.tsx'
import Homepage from './routes/Homepage.tsx'
import Signup from './routes/Signup.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
