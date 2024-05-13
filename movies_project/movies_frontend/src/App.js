import React, { useState, useEffect } from 'react';

const App = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [votes, setVotes] = useState({});
  const [expandedMovie, setExpandedMovie] = useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch('/movies.json'); // Path to our JSON file
        const data = await response.json();
        setMoviesData(data);
        // Initializing votes with 0 votes for each movie
        const initialVotes = {};
        data.forEach(({ movies }) => {
          movies.forEach((movie) => {
            initialVotes[movie.title] = 0;
          });
        });
        setVotes(initialVotes);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleVote = (title) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [title]: prevVotes[title] + 1,
    }));
  };

  const handleRemoveVote = (title) => {
    if (votes[title] > 0) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [title]: prevVotes[title] - 1,
      }));
    }
  };

  const handleExpand = (title) => {
    setExpandedMovie((prevExpandedMovie) => (prevExpandedMovie === title ? null : title));
  };

  const handleResetVotes = () => {
    const resetVotes = {};
    Object.keys(votes).forEach((title) => {
      resetVotes[title] = 0;
    });
    setVotes(resetVotes);
  };

  const filteredMovies = moviesData.flatMap(({ date, movies }) => movies.map(movie => ({...movie, date: new Date(date).toLocaleDateString()}))).filter((movie) =>
    (selectedGenre === '' || movie.genre.includes(selectedGenre)) &&
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extracting unique genres from all movies
  const genres = [...new Set(moviesData.flatMap(({ movies }) => movies.flatMap(({ genre }) => genre)))];

  return (
    <div style={{ backgroundColor: 'black', padding: '20px' }}>
      <h1 style={{ color: 'cyan', textAlign: 'center' }}>Movies@Mariana Tek</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '5px', borderRadius: '5px', width: '300px', fontSize: '16px', marginRight: '10px', backgroundColor: 'black', border: '1px solid white', color: 'white' }}
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          style={{ padding: '5px', borderRadius: '5px', fontSize: '16px', backgroundColor: 'black', border: '1px solid white', color: 'white' }}
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={handleResetVotes} style={{ padding: '8px 16px', borderRadius: '5px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: '1px solid white', marginRight: '10px' }}>Reset Votes</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Date</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', fontSize: '20px' }}>Poster</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Title</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Genre</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Rated</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Year Released</th>
            {/* <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', fontSize: '20px' }}>Released</th> */}
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Metacritic Rating</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', borderRight: '1px solid grey', fontSize: '20px' }}>Runtime</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', fontSize: '20px' }}>Votes</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', fontSize: '20px' }}>Vote</th>
            <th style={{ color: 'white', textAlign: 'center', borderBottom: '5px solid white', fontSize: '20px' }}>Remove Vote</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie, index) => (
            <React.Fragment key={index}>
              <tr style={index > 0 && filteredMovies[index - 1].date !== movie.date ? { borderTop: '3px solid white' } : null}>
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.date}</td>
                <td style={{ textAlign: 'center' }} onClick={() => handleExpand(movie.title)}><img src={movie.poster} alt={movie.title} style={{ width: '100px', cursor: 'pointer' }} /></td>
                <td style={{ color: 'white', textAlign: 'center', cursor: 'pointer', borderRight: '1px solid grey', fontSize: '20px', color: 'yellow' }} onClick={() => handleExpand(movie.title)}>{movie.title}</td>
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.genre.join(', ')}</td>
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.rated}</td>
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.year}</td>
                {/* <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid white' }}>{movie.released}</td> */}
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.meta_score}</td>
                <td style={{ color: 'white', textAlign: 'center', borderRight: '1px solid grey' }}>{movie.runtime}</td>
                <td style={{ color: 'white', textAlign: 'center' }}>{votes[movie.title]}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleVote(movie.title)} style={{backgroundColor: 'lightgreen', border: '1px solid white'}}>Vote</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleRemoveVote(movie.title)} style={{backgroundColor: 'red', border: '1px solid white'}}>Remove Vote</button>
                </td>
              </tr>
              {expandedMovie === movie.title && (
                <tr>
                  <td colSpan="12">
                    <div style={{ color: 'white', padding: '10px', backgroundColor: 'grey' }}>
                      <p>{movie.plot}</p>
                      <p>Director: {movie.director}</p>
                      <p>Actors: {movie.actors}</p>
                      <p>Language: {movie.language}</p>
                      <p>Country: {movie.country}</p>
                      <p>Awards: {movie.awards}</p>
                      <p>IMDB Rating: {movie.imdb_rating}</p>
                      <p>IMDB Votes: {movie.imdb_votes}</p>
                      <p>IMDB ID: {movie.imdb_id}</p>
                      <p>Type: {movie.type}</p>
                      <p>DVD: {movie.dvd}</p>
                      <p>Box Office: {movie.box_office}</p>
                      <p>Production: {movie.production}</p>
                      <p>Website: {movie.website}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;