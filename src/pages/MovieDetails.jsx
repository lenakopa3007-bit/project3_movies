import MovieCard from "components/MovieCard/MovieCard";
import { useEffect, useRef, useState } from "react"
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import { getMovieByID, getSimilarMovies } from "services/APIService";
import { useTheme } from "context/ThemeContext";
import MoviesList from "components/MovieList";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { isDark } = useTheme();
  
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

  useEffect(() => {
    async function fetchMovieById(value) {
      try {
        const response = await getMovieByID(value);
        if (!response || response.success === false) {
          setError("Failed to load movie info.");
          return;
        }
        setMovie(response);

        // Завантажуємо схожі фільми разом з деталями
        const similar = await getSimilarMovies(value);
        setSimilarMovies(similar.slice(0, 6)); // Показуємо тільки 6

      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Something went wrong. Please try again later.");
      }
    }
    fetchMovieById(movieId);
  }, [movieId]);

  // 1. інлайн-стилі кнопки (center взяли в лапки)
  const backBtnStyles = {
    display: 'inline-flex',
    alignItems: 'center', 
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: isDark ? 'rgba(65,105,225,0.15)' : '#e8f0fe',
    color: '#4169e1',           // Синій текст
    border: '2px solid #4169e1', // Синя рамка
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  };

  const additionalInfoStyles = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  // заголовок адаптований під тему
  const additionalInfoTitleStyles = {
    marginTop: 0,
    marginBottom: '15px',
    color: isDark ? '#e0e0e0' : '#333',
  };

  const subLinkStyles = {
    display: 'inline-block',
    marginRight: '15px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  if (error) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      
      {/* 2. Оновлена кнопка з правильним ховером (тепер події змінюють сині кольори) */}
      <Link 
        to={backLink.current} 
        style={backBtnStyles}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#4169e1'; // При наведенні фон стає насичено синім
          e.currentTarget.style.color = '#ffffff';           // Текст стає білим
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(65,105,225,0.15)' : '#e8f0fe'; // Коли мишку прибрали — повертається ніжно-синій
          e.currentTarget.style.color = '#4169e1';           // Повертається синій текст
        }}
      >
        ← Go back
      </Link>
      
      {movie ? (        
        <MovieCard movie={movie} isDark={isDark} />
      ) : (
        <p style={{ textAlign: 'center', color: isDark ? '#aaa' : '#666' }}>
          Loading cartoon details...
        </p>
      )}
      
      <div style={additionalInfoStyles}>
        <h3 style={additionalInfoTitleStyles}>Additional information</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
          <li>
            <Link 
              to="cast" 
              style={subLinkStyles}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'} >
              Cast
            </Link>
          </li>
          <li>
            <Link 
              to="reviews" 
              style={subLinkStyles}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Reviews
            </Link>
          </li>
        </ul>  
      </div>
      
      <Outlet />

      {/* СХОЖІ ФІЛЬМИ */}
      {similarMovies.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ 
            color: isDark ? '#e0e0e0' : '#1a1a2e',
            marginBottom: '8px',
            fontSize: '24px',
            fontWeight: 700,
          }}>
            Similar Movies
          </h3>
          {/* Використовуємо MoviesList — він покаже схожі фільми в сітці з модалкою */}
          <MoviesList movies={similarMovies} />
        </div>
      )}
    </div>
  )
}