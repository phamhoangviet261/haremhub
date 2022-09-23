import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

// ----------------------------------------------------------------------

MovieList.propTypes = {
    movies: PropTypes.array.isRequired
};

export default function MovieList({ movies, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {movies.map((movie, index) => (
        <Grid key={movie._id} item xs={12} sm={6} md={3}>
          <MovieCard movie={movie} index={index}/>
        </Grid>
      ))}
      
    </Grid>
  );
}
