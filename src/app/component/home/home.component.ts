import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { movie } from '../../movie.data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movies = inject(MovieService);
  router = inject(Router);
  movieList: movie[] = [];
  ngOnInit() {
    let currentmovies = this.movies.getmovies();
    this.movieList = currentmovies.filter((movie) => movie.enabled);
    console.log(this.movieList);
  }
  onMovieClick(id: number) {
    this.router.navigate(['/moviedetails', id]);
  }
}
