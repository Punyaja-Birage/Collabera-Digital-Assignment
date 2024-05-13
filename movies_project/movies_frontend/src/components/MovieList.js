import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/movies/')
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleGenreFilter = (event) => {
    const genre = event.target.value;
    setGenreFilter(genre);
    if (genre === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie => movie.genres.includes(genre));
      setFilteredMovies(filtered);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(term));
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={genreFilter} onChange={handleGenreFilter}>
        <option value="">All Genres</option>
        {/* Populate dropdown with unique genres */}
        {Array.from(new Set(movies.map(movie => movie.genres.split(','))).flat()).map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title} />
            <p>Genres: {movie.genres}</p>
            <p>Rating: {movie.rating}</p>
            <p>Year Release: {movie.year_release}</p>
            <p>Metacritic Rating: {movie.metacritic_rating}</p>
            <p>Runtime: {movie.runtime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
