import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/APIService';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews(id) {
      try {
        const response = await getMovieReviews(id);
        // Безпечний запис: якщо результатів немає, ставимо порожній масив
        setMovieReviews(response?.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setMovieReviews([]);
      }
    }
    fetchReviews(movieId);
  }, [movieId]);

  // Inline-стилі для відгуків
  const containerStyles = {
    listStyle: 'none',
    padding: '0',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const reviewItemStyles = {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  };

  const authorStyles = {
    margin: '0 0 8px 0',
    color: '#007bff',
    fontSize: '16px',
  };

  const contentStyles = {
    margin: '0',
    color: '#444',
    lineHeight: '1.5',
    fontSize: '14px',
    whiteSpace: 'pre-line', // Зберігає абзаци у тексті відгуку
  };

  // Перевірку виносимо окремо, щоб не порушувати семантику тегу <ul>
  if (movieReviews.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
        There are no reviews about this film yet.
      </p>
    );
  }

  return (
    <ul style={containerStyles}>
      {movieReviews.map(review => (
        <li key={review.id} style={reviewItemStyles}>
          <h4 style={authorStyles}>Author: {review.author}</h4>
          <p style={contentStyles}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}