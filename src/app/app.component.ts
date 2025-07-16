import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import * as Aos from 'aos';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'movieBooking';
  ngOnInit() {
    Aos.init();
    this.updatemovies();
  }

  updatemovies() {
    const raw = localStorage.getItem('Movies');
    if (!raw) return;
    const movies = JSON.parse(raw);
    const updatedMovies = movies.map((movie: any) => ({
      ...movie,
      enabled: movie.enabled ?? true, // Add default if missing
    }));
    localStorage.setItem('Movies', JSON.stringify(updatedMovies));
  }
}
