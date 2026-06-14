import { Container, Title, WatchButton } from "./MovieCard.styled";

export default function MovieCard({ movie }) {
  // Робимо безпечну деструктуризацію
  const { 
    poster_path, 
    title, 
    release_date, 
    vote_average, 
    overview, 
    genres 
  } = movie || {};

  // Картинка-заглушка, якщо у фільму немає постера
  const defaultImg = 'https://dl-media.viber.com/pg_viewer/detail/pd-4/media/0970/5222/2191/3365/8221/3041/8221304192770219.jpg';

  // Збільшуємо якість постера з w200 на w300
  const url = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : defaultImg;
  
  // Безпечно мапимо жанри
  const movieGenres = genres ? genres.map(genre => genre.name) : [];

  // Автоматичний лінк на пошук трейлера фільму на YouTube
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent((title || "") + " official trailer")}`;

  return (
    <Container>
      <img src={url} alt={title || "Movie poster"} />
      <div>
        {/* Назва та рік в один рядок із правильними шрифтами */}
        <Title>
          {title || "Unknown Title"} 
          <span style={{ fontWeight: 500, color: '#555', marginLeft: '8px' }}>
            ({release_date?.slice(0, 4) || "????"})
          </span>
        </Title>
        
        <p><strong>User score:</strong> {vote_average ? Math.round(vote_average * 10) : 0}%</p>
        
        <h4>Overview</h4>
        <p>{overview || "No overview available."}</p>
        
        <h4>Genres</h4> {/* жанри */}
        <p>{movieGenres.length > 0 ? movieGenres.join(', ') : "No genres"}</p>

        {/* кнопка перегляду фільмів */}
        <WatchButton href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer">
          Watch Trailer
        </WatchButton>
      </div>
    </Container>
  );
}



