import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/index.css'

import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path:"/movie/:id",
    element: <MoviePage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)