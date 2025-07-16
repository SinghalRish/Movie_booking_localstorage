import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { movie } from '../../movie.data';
import { CommonModule, DatePipe } from '@angular/common';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-moviedetails',
  imports: [DatePipe, FontAwesomeModule, CommonModule],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css',
})
export class MoviedetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  movieservice = inject(MovieService);
  movie: movie | undefined;
  faSolid = faSolidStar;
  faRegular = faSolidStar;
  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movieservice.getparticularmovie(movieId);
    console.log(this.movie);
  }
  onBookNow() {
    this.router.navigate(['/room-view', this.movie?.id]);
  }
}
