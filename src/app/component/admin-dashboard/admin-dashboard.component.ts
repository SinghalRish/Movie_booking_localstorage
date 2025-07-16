import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { movie } from '../../movie.data';
import { MovieService } from '../../services/movie/movie.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEdit,
  faEye,
  faEyeSlash,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import Aos from 'aos';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  movieservice = inject(MovieService);
  router = inject(Router);
  MovieData: movie[] = [];
  isadding = false;
  isviewing = false;
  edit = faEdit;
  trash = faTrash;
  cross = faXmark;
  eye = faEye;
  eyeslash = faEyeSlash;
  isenabled = true;
  ngOnInit(): void {
    this.MovieData = this.movieservice.getmovies();
    Aos.init();
  }

  onadd(data: movie) {
    // console.log(data);
    // this.movieservice.moviedata.update((movies) => [...movies, data]);
    // console.log(this.movieservice.moviedata());
    if (!data.id) {
      data.id = Date.now();
    }
    this.movieservice.setlocalstorage(data);
    this.MovieData = this.movieservice.getmovies();
    console.log(this.MovieData);
    this.isadding = !this.isadding;
  }
  addmovie() {
    this.isadding = !this.isadding;
    if (this.isviewing === true) this.isviewing = !this.isviewing;
  }
  view() {
    this.isviewing = !this.isviewing;
    if (this.isadding === true) this.isadding = !this.isadding;
  }

  delete(movie: movie) {
    let allmovies = localStorage.getItem('Movies');
    if (allmovies) {
      let parsedmovies: movie[] = JSON.parse(allmovies);
      let updatedMovies = parsedmovies.filter((m: movie) => m.id !== movie.id);
      localStorage.setItem('Movies', JSON.stringify(updatedMovies));
      this.MovieData = updatedMovies;
    }
  }

  details(id: number) {
    this.router.navigate(['/moviedetails', id]);
  }

  gotorooms() {
    this.router.navigate(['/rooms']);
  }

  toggleenable(movieId: number): void {
    this.movieservice.toggleEnable(movieId);
    this.refresh();
  }

  refresh() {
    this.MovieData = this.movieservice.getmovies();
  }
}
