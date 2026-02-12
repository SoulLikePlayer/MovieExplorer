import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import MoviePage from './pages/MoviePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Page d'accueil</div>
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
