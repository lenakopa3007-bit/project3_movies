const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
  }
};

// 1. Популярні мультфільми
async function getPopularCartoons() {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16',
      options
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
  }
}

// 2. Деталі про фільм
async function getMovieByID(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error(error);
  }
}

// 3. Пошук фільмів
async function getMovieBySearch(search) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
  }
}

// 4. Акторський склад
async function getMovieCast(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const movieCast = await response.json();
    return movieCast;
  } catch (error) {
    console.error(error);
  }
}

// 5. Відгуки
async function getMovieReviews(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
      options
    );
    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error(error);
  }
}

// 6. Жанри
async function getGenres() {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
      options
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error(error);
  }
}

// 7. Пошук з фільтрами
async function getMoviesByFilters({ query = '', year = '', genreId = '', rating = '' }) {
  try {
    const params = new URLSearchParams({
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
    });
    if (query) params.set('query', query);
    if (year) params.set('primary_release_year', year);
    if (genreId) params.set('with_genres', genreId);
    if (rating) params.set('vote_average.gte', rating);

    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?${params}`
      : `https://api.themoviedb.org/3/discover/movie?${params}`;

    const response = await fetch(endpoint, options);
    const data = await response.json();
    return data.results ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 8. Схожі фільми
async function getSimilarMovies(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data.results ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
// Експортуємо ВСІ функції, які потрібні додатку
export { getPopularCartoons, getMovieByID, getMovieBySearch, getMovieCast, getMovieReviews, getGenres, getMoviesByFilters, getSimilarMovies };