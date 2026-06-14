import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';


// Ліниве завантаження компонентів
const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));

// ДОДАЄМО: ліниве завантаження для нової сторінки About me
const About = lazy(() => import('pages/About'));

export const App = () => {
  return (
    /* Огортаємо всі маршрути в Suspense. 
       У fallback передаємо те, що буде видно долю секунди, поки вантажиться сторінка 
    */
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          
          {/* ДОДАЄМО: Маршрут для сторінки About me */}
          <Route path="about" element={<About />} />
          
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Route>
        
        {/* Якщо користувач ввів шлях, якого немає (наприклад /abc), 
          Navigate автоматично та м'яко перенаправить його на головну сторінку 
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};