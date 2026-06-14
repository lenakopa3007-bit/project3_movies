import { useState, useEffect } from 'react';
import MoviesList from 'components/MovieList';
import { getPopularCartoons } from 'services/APIService';
import { ContactForm } from "../components/ContactForm/ContactForm";
import { useTheme } from 'context/ThemeContext';

export default function Home() {
  const { isDark } = useTheme();
  const [movies, setMovies] = useState([]);
  // Стейт для контролю кількості карток на екрані (початково 6)
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchMovies() {
      const films = await getPopularCartoons();
      setMovies(films.results);
    }
    fetchMovies();
  }, []);

  // Функція для кнопки "More"
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  // Обрізаємо масив мультфільмів до 9 (або більше при кліку)
  const displayedMovies = movies.slice(0, visibleCount);

  // Inline-стилі для кнопки "More"
  const buttonStyles = {
    display: 'block',
    margin: '30px auto',
    padding: '12px 35px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4169e1',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',

    // Додаємо плавність для трансформації
    transition: 'background-color 0.2s, transform 0.2s ease',
  };

  return (
    <section style={{ padding: '20px' }}>
      <h1 style={{ fontFamily: 'Montserrat', 
        textTransform: 'uppercase', 
        letterSpacing: '1px', 
        fontSize: '32px', 
        fontWeight: 700,
        color: isDark ? '#e0e0e0' : '#1a1a2e',  // колір заголовку //
        }}>
        Popular cartoons
      </h1>
      
      {/* красива сітка з постерів */}
      <MoviesList movies={displayedMovies} />

      {/* Кнопка з'являється, якщо є що завантажувати */}
      {visibleCount < movies.length && (
        <button 
          type="button" 
          style={buttonStyles} 
          onClick={handleLoadMore}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#3351c4'; // Темніший колір
            e.target.style.transform = 'scale(1.05)';   // Збільшення
          }} 
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#4169e1'; // Початковий колір
            e.target.style.transform = 'scale(1)';      // Повернення розміру
          }}
        >
          More
        </button>
      )}
      <ContactForm />
    </section>
  );
}