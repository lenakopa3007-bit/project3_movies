import { useState } from 'react';
import { useTheme } from 'context/ThemeContext';
import { getMovieByID } from 'services/APIService';
import MovieCard from 'components/MovieCard/MovieCard';

export default function MoviesList({ movies }) {
  const { isDark } = useTheme();
  const [hoveredId, setHoveredId] = useState(null);
  
  // Стейт для модалки — null якщо закрита, об'єкт фільму якщо відкрита
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingMovie, setLoadingMovie] = useState(false);

  // Відкриваємо модалку — завантажуємо повні деталі фільму
  const handleMovieClick = async (e, movieId) => {
    e.preventDefault(); // Зупиняємо перехід на сторінку
    setLoadingMovie(true);
    const movie = await getMovieByID(movieId);
    setSelectedMovie(movie);
    setLoadingMovie(false);
    // Забороняємо скрол сторінки поки модалка відкрита
    document.body.style.overflow = 'hidden';
  };

  // Закриваємо модалку
  const handleClose = () => {
    setSelectedMovie(null);
    document.body.style.overflow = '';
  };

  const gridListStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
    padding: '0',
    listStyle: 'none',
    marginTop: '20px',
  };

  return (
    <>
      <ul style={gridListStyles}>
        {movies.map(movie => {
          const isHovered = movie.id === hoveredId;

          const gridItemStyles = {
            backgroundColor: isDark ? '#1e2a3a' : '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: isHovered 
              ? '0 10px 20px rgba(0, 0, 0, 0.2)' 
              : '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            cursor: 'pointer',
          };

          const posterStyles = {
            width: '100%',
            height: '340px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          };

          const titleStyles = {
            padding: '14px 12px',
            margin: '0',
            fontSize: '16px',
            fontWeight: 'bold',
            color: isHovered ? '#007bff' : (isDark ? '#e0e0e0' : '#333'),
            textAlign: 'center',
            transition: 'color 0.3s ease',
          };

          return (
            <li 
              key={movie.id} 
              style={gridItemStyles}
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => handleMovieClick(e, movie.id)}
            >
              <img
                style={posterStyles}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://placehold.co/500x750?text=No+Poster'
                }
                alt={movie.title}
                loading={movies.indexOf(movie) < 3 ? 'eager' : 'lazy'} // перші 3 eager
                fetchpriority={movies.indexOf(movie) === 0 ? 'high' : 'auto'}  // перший high
                width="300"
                height="450"
              />
              <p style={titleStyles}>{movie.title}</p>
            </li>
          );
        })}
      </ul>

      {/* МОДАЛЬНЕ ВІКНО */}
      {(selectedMovie || loadingMovie) && (
        <>
          {/* Затемнений фон — клік закриває модалку */}
          <div
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 2000,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Вміст модалки */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2001,
            background: isDark ? '#16213e' : '#fff',
            borderRadius: '16px',
            padding: '32px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            
            {/* Кнопка закриття */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: isDark ? '#e0e0e0' : '#333',
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {/* Лоадер або вміст */}
            {loadingMovie ? (
              <p style={{ textAlign: 'center', color: isDark ? '#aaa' : '#666' }}>
                Loading...
              </p>
            ) : (
              <MovieCard movie={selectedMovie} isDark={isDark} />
            )}
          </div>
        </>
      )}
    </>
  );
}