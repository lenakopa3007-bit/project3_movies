import { useEffect, useState } from 'react';
import { useTheme } from 'context/ThemeContext';
import { getMoviesByFilters, getGenres } from 'services/APIService';
import MoviesList from 'components/MovieList';

export default function Movies() {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 600);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Стейт для списку фільмів що повернув сервер
  const [movies, setMovies] = useState([]);
  
  // Стейт для списку жанрів (завантажуємо один раз при монтуванні)
  const [genres, setGenres] = useState([]);
  
  // Стейти для кожного фільтру
  const [query, setQuery] = useState('');      // текстовий пошук
  const [year, setYear] = useState('');        // рік випуску
  const [genreId, setGenreId] = useState('');  // жанр
  const [rating, setRating] = useState('');    // мінімальний рейтинг
  
  // Прапорець — чи користувач вже натискав Search хоч раз
  const [searched, setSearched] = useState(false);

  // Завантажуємо список жанрів один раз при відкритті сторінки
  useEffect(() => {
    getGenres().then(data => setGenres(data ?? []));
  }, []);

  // Функція пошуку — викликається при натисканні кнопки Search
  const handleSearch = async () => {
    setSearched(true);
    const results = await getMoviesByFilters({ query, year, genreId, rating });
    setMovies(results);
  };

  // Функція скидання — очищає всі фільтри і результати
  const handleReset = () => {
    setQuery('');
    setYear('');
    setGenreId('');
    setRating('');
    setMovies([]);
    setSearched(false);
  };

  // Генеруємо масив років від поточного до 1990
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  // Інлайн-стилі винесені в окремий об'єкт для зручності
  const s = {
    // Загальна сторінка — фільтри зверху, фільми знизу
    page: { 
      display: 'flex', 
      flexDirection: 'column',
      gap: '24px', 
      padding: '20px', 
    },

    // Панель фільтрів — горизонтальна сітка на десктопі
    sidebar: {
      width: '100%',
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      // Сітка: заголовок | 4 поля | 2 кнопки
      display: 'grid',
      // на мобільному 1 колонка, на десктопі 4 поля + 2 кнопки
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr) auto auto',
      gap: '8px 16px',
      alignItems: 'end', // вирівнює всі елементи по нижньому краю
    },

    // Заголовок "Filters" — розтягується на всю ширину
    title: { 
      fontSize: '18px', 
      fontWeight: 700, 
      color: isDark ? '#e0e0e0' : '#1a1a2e', 
      gridColumn: '1 / -1', // займає всі колонки
      marginBottom: '4px',
    },

    // Лейбл над полем
    label: { 
      display: 'block', 
      marginBottom: '4px', 
      fontWeight: 600, 
      fontSize: '13px', 
      color: isDark ? '#aaa' : '#555',
    },

    // Текстове поле
    input: {
      width: '100%',
      padding: '8px 10px',
      borderRadius: '6px',
      border: isDark ? '1px solid #444' : '1px solid #ccc',
      background: isDark ? '#1e2a3a' : '#fff',
      color: isDark ? '#e0e0e0' : '#333',
      fontSize: '14px',
      boxSizing: 'border-box',
    },

    // Випадаючий список
    select: {
      width: '100%',
      padding: '8px 10px',
      borderRadius: '6px',
      border: isDark ? '1px solid #444' : '1px solid #ccc',
      background: isDark ? '#1e2a3a' : '#fff',
      color: isDark ? '#e0e0e0' : '#333',
      fontSize: '14px',
      boxSizing: 'border-box',
    },

    // Кнопка Search
    btnSearch: {
      padding: '8px 20px',
      borderRadius: '6px',
      border: 'none',
      background: '#4169e1',
      color: '#fff',
      fontWeight: 700,
      fontSize: '14px',
      cursor: 'pointer',
      whiteSpace: 'nowrap', // текст не переноситься
    },

    // Кнопка Reset
    btnReset: {
      padding: '8px 20px',
      borderRadius: '6px',
      border: isDark ? '1px solid #555' : '1px solid #ccc',
      background: 'transparent',
      color: isDark ? '#aaa' : '#666',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },

    // Зона результатів
    content: { 
      width: '100%',
    },
  };

  return (
    <div style={s.page}>
      
      {/* ПАНЕЛЬ ФІЛЬТРІВ — горизонтальна на десктопі */}
      <aside style={s.sidebar}>
        
        {/* Заголовок на всю ширину */}
        <div style={s.title}>🎬 Filters</div>

        {/* Кожне поле загорнуте в div — так лейбл і поле йдуть разом */}
        
        {/* Текстовий пошук */}
        <div>
          <label style={s.label}>Search</label>
          <input
            style={s.input}
            type="text"
            placeholder="Movie title..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Фільтр по року */}
        <div>
          <label style={s.label}>Year</label>
          <select style={s.select} value={year} onChange={e => setYear(e.target.value)}>
            <option value="">All years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Фільтр по жанру */}
        <div>
          <label style={s.label}>Genre</label>
          <select style={s.select} value={genreId} onChange={e => setGenreId(e.target.value)}>
            <option value="">All genres</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>

        {/* Фільтр по рейтингу */}
        <div>
          <label style={s.label}>Min rating</label>
          <select style={s.select} value={rating} onChange={e => setRating(e.target.value)}>
            <option value="">Any</option>
            {[9, 8, 7, 6, 5].map(r => <option key={r} value={r}>{r}+</option>)}
          </select>
        </div>

        {/* Кнопки — вирівнюються по нижньому краю завдяки alignItems: 'end' */}
        <button style={s.btnSearch} onClick={handleSearch}>Search</button>
        <button style={s.btnReset} onClick={handleReset}>Reset</button>

      </aside>

      {/* РЕЗУЛЬТАТИ ПОШУКУ */}
      <div style={s.content}>
        
        {/* Якщо є результати — показуємо сітку карток */}
        {movies.length > 0 && <MoviesList movies={movies} />}
        
        {/* Якщо шукали але нічого не знайшли */}
        {searched && movies.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '40px', color: isDark ? '#aaa' : '#666' }}>
            No movies found. Try different filters.
          </p>
        )}
        
        {/* Початковий стан — користувач ще нічого не шукав */}
        {!searched && (
          <p style={{ textAlign: 'center', marginTop: '40px', color: isDark ? '#aaa' : '#666' }}>
            Use filters to find movies 🎬
          </p>
        )}
      </div>
    </div>
  );
}