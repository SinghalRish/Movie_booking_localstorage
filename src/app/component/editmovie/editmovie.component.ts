import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-editmovie',
  imports: [CommonModule, FormsModule],
  templateUrl: './editmovie.component.html',
  styleUrl: './editmovie.component.css',
})
export class EditmovieComponent implements OnInit {
  movieservice = inject(MovieService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  movie:
    | import('d:/Netprophets/angular/angular-practice/movieBooking/src/app/movie.data').movie
    | undefined;

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movie = this.movieservice.getparticularmovie(+movieId);
    }

    if (!this.movie) {
      console.error('Movie not found for id:', movieId);
    }
  }
  onedit(data: any) {
    if (this.movie) {
      this.movieservice.updateMovie({ ...this.movie, ...data });
    }
    this.router.navigate(['/admindashboard']);
  }
}
