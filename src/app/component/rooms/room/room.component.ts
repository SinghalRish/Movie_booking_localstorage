import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { movie } from '../../../movie.data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-room',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  movieservice = inject(MovieService);
  allMovies: movie[] = [];
  hallNumbers: number[] = [];
  selectedHall: number | null = null;
  filteredMovies: movie[] = [];
  router = inject(Router);

  ngOnInit() {
    this.allMovies = this.movieservice.getmovies();
    this.hallNumbers = Array.from(
      new Set(this.allMovies.map((m) => m.hall).filter((h) => h !== null))
    ) as number[];
    console.log(this.hallNumbers);
    this.filteredMovies = this.allMovies; // Initially showing all movies
  }

  onHallChange() {
    if (this.selectedHall === null) {
      this.filteredMovies = this.allMovies;
    } // Show all movies if no hall selected
    else {
      this.filteredMovies = this.allMovies.filter(
        (m) => m.hall === this.selectedHall
      );
    }
  }
  goToRoomEdit() {
    // Navigate to the room edit component
    if (this.selectedHall) {
      this.router.navigate(['/roomedit', this.selectedHall]);
    } else {
      this.router.navigate(['/roomedit']);
    }
  }
}
