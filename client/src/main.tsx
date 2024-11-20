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
import BookInfo from './routes/BookInfo.tsx'
import SearchResults from './routes/SearchResults.tsx'
import Settings from './routes/Settings.tsx'
import Profile from './routes/Profile.tsx'
import Bookmarks from './routes/Bookmarks.tsx'

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
  {
    path: "/book/:isbn",
    element: <BookInfo />,
  },
  {
    path: "/results",
    element: <SearchResults />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/user/:username",
    element: <Profile />
  },
  {
    path: "/bookmarks",
    element: <Bookmarks />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
