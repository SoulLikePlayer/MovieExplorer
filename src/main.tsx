import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './assets/index.css'

import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';

const router = createHashRouter([
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