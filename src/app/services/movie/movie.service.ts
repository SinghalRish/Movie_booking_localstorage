import { Injectable, signal } from '@angular/core';
import { movie } from '../../movie.data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor() {
    const stored = localStorage.getItem('Movies');
    if (stored) {
      this.moviedata.set(JSON.parse(stored));
    }
  }

  moviedata = signal<movie[]>([]);

  setlocalstorage(data: movie) {
    this.moviedata.update((movies) => [...movies, data]);
    localStorage.setItem('Movies', JSON.stringify(this.moviedata()));
  }

  getmovies(): movie[] {
    return this.moviedata();
  }

  getparticularmovie(id: number): movie | undefined {
    return this.moviedata().find((movie) => movie.id === id);
  }
  updateMovie(updatedMovie: movie) {
    this.moviedata.update((movies) => {
      const index = movies.findIndex((m) => m.id === updatedMovie.id);
      if (index !== -1) {
        movies[index] = updatedMovie;
      }
      return movies;
    });
    localStorage.setItem('Movies', JSON.stringify(this.moviedata()));
  }

  toggleEnable(movieId: number) {
    this.moviedata.update((movies) =>
      movies.map((movie) =>
        movie.id === movieId ? { ...movie, enabled: !movie.enabled } : movie
      )
    );

    localStorage.setItem('Movies', JSON.stringify(this.moviedata()));
  }
}
