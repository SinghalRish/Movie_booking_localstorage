import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie/movie.service';
import { movie } from '../../../movie.data';
import { HallconfigService } from '../../../hallconfig service/hallconfig.service';
import { ticket } from '../../../../ticket.data';
type SeatId = string;

@Component({
  selector: 'app-room-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css',
})
export class RoomViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  movieservice = inject(MovieService);
  hallconfigservice = inject(HallconfigService);
  movie: movie | undefined;
  rows: string[] = [];
  seats: number[] = [];
  ticketarr: ticket[] | null = [];
  room = {
    hallNumber: null,
    rows: null,
    seatsPerRow: null,
  };
  isadminlogin = false;
  bookedSeats: Set<SeatId> = new Set();
  selectedSeats: Set<string> = new Set();
  isauthorized = false;

  // ngOnInit() {
  //   const movieId = Number(this.route.snapshot.paramMap.get('id'));
  //   this.movie = this.movieservice.getparticularmovie(movieId);

  //   if (this.movie) {
  //     const key = this.getStorageKey(this.movie.id);
  //     const stored = localStorage.getItem(key);
  //     this.bookedSeats = new Set(stored ? JSON.parse(stored) : []);
  //   }
  // }

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movieservice.getparticularmovie(movieId);
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    // const user =
    //   userData?.consumer?.loggedin || userData?.admin?.loggedin || null; Not used just for a try

    if (userData?.admin?.loggedin) {
      this.isadminlogin = true;
    }

    if (this.movie) {
      const hallNo = this.movie.hall;
      this.room = this.hallconfigservice.getroomconfig(hallNo);
      console.log(this.room);

      if (hallNo == null || !this.movie.name) {
        console.error('Hall number or movie name is missing');
        return;
      }
      const movieName = this.movie.name;

      const roomData = JSON.parse(localStorage.getItem('Rooms') || '{}');
      const movieSeats = roomData?.[hallNo]?.[movieName] || [];

      this.bookedSeats = new Set(movieSeats.map((entry: any) => entry.seat));
    }
    if (this.room.rows && this.room.seatsPerRow) {
      this.rows = this.hallconfigservice.generateRowLabels(this.room.rows);
      this.seats = this.hallconfigservice.generateSeatNumbers(
        this.room.seatsPerRow
      );
    }
    //implemented logic but not achieved desired output
    // let booked = localStorage.getItem('Rooms');
    // console.log(booked);
    // if (booked && this.movie?.name && this.movie.hall) {
    //   let bookedmovie = JSON.parse(booked);
    //   console.log(bookedmovie[this.movie.hall][this.movie.name]);
    // }
  }

  getStorageKey(movieId: number) {
    return `BookedSeats_${movieId}`;
  }

  //made initialy but changed because need to add some other feature in it
  // toggleSeat(row: string, num: number) {
  //   const seatId = `${row}${num}`;
  //   if (this.bookedSeats.has(seatId)) {
  //     if (this.isadminlogin) {
  //       // Admin wants to unbook the seat
  //       this.bookedSeats.delete(seatId);
  //       this.removeSeatFromStorage(seatId);
  //     }
  //     return;
  //   }

  //   if (this.selectedSeats.has(seatId)) {
  //     this.selectedSeats.delete(seatId);
  //   } else {
  //     this.selectedSeats.add(seatId);
  //   }
  // }
  toggleSeat(row: string, num: number) {
    const seatId = `${row}${num}`;
    const hallNo = this.movie?.hall;
    const movieName = this.movie?.name;
    if (!hallNo || !movieName) return;

    // Get current user , user can be consumer as well as admin , user not used
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    // const user =
    //   userData?.consumer?.loggedin || userData?.admin?.loggedin || null;
    const loggedInName =
      userData?.admin?.loggedin?.name ||
      userData?.consumer?.loggedin?.name ||
      'unknown';

    // Get room data
    const roomData = JSON.parse(localStorage.getItem('Rooms') || '{}');
    const bookedSeatsArr = roomData[hallNo]?.[movieName] || [];

    // Check if seat is booked
    const seatBooking = bookedSeatsArr.find(
      (entry: any) => entry.seat === seatId
    );

    //basically implementing logic for booking and unbooking authorization
    if (seatBooking) {
      // If booked by current user, allow unbooking
      if (seatBooking.bookedBy === loggedInName) {
        // Remove from bookedSeatsArr
        roomData[hallNo][movieName] = bookedSeatsArr.filter(
          (entry: any) => entry.seat !== seatId
        );
        localStorage.setItem('Rooms', JSON.stringify(roomData));
        this.bookedSeats.delete(seatId);
      } else {
        // Optionally show message: Only the user who booked can unbook
        alert('You can only unbook seats you have booked.');
      }
      return;
    }

    // If not booked, allow selection/deselection as usual
    if (this.selectedSeats.has(seatId)) {
      this.selectedSeats.delete(seatId);
    } else {
      this.selectedSeats.add(seatId);
    }
  }
  removeSeatFromStorage(seatId: string) {
    if (!this.movie || this.movie.hall == null || !this.movie.name) return;

    const hallNo = this.movie.hall;
    const movieName = this.movie.name;

    const roomData = JSON.parse(localStorage.getItem('Rooms') || '{}');

    if (roomData[hallNo] && roomData[hallNo][movieName]) {
      roomData[hallNo][movieName] = roomData[hallNo][movieName].filter(
        (entry: any) => entry.seat !== seatId
      );

      // Save back to localStorage
      localStorage.setItem('Rooms', JSON.stringify(roomData));
    }
  }

  isBooked(row: string, num: number) {
    return this.bookedSeats.has(`${row}${num}`);
  }

  isSelected(row: string, num: number) {
    return this.selectedSeats.has(`${row}${num}`);
  }
  //made it initially but afterward added new logics so implemented again
  // bookSeats() {
  //   const allSeats = new Set([...this.bookedSeats, ...this.selectedSeats]);
  //   localStorage.setItem(
  //     this.getStorageKey(this.movie!.id),
  //     JSON.stringify([...allSeats])
  //   );
  //   this.bookedSeats = allSeats;
  //   this.selectedSeats.clear();
  // }
  bookSeats() {
    if (!this.movie) return;
    if (this.selectedSeats.size === 0) {
      alert('Please select at least one seat to book.');
      return;
    }
    const hallNo = this.movie.hall;
    if (hallNo == null || !this.movie.name) {
      console.error('Hall number or movie name is missing');
      return;
    }
    const movieName = this.movie.name;
    const selectedSeatIds = [...this.selectedSeats];

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const user =
      userData?.consumer?.loggedin || userData?.admin?.loggedin || null;

    if (!user) {
      alert('Please login to book seats.');
      return;
    }
    //not used loggedinid so thats why commented
    // const loggedInId =
    //   userData?.admin?.loggedin?.id ||
    //   userData?.consumer?.loggedin?.id ||
    //   'unknown';
    const loggedInname =
      userData?.admin?.loggedin?.name ||
      userData?.consumer?.loggedin?.name ||
      'unknown';

    const newlyBooked = selectedSeatIds.map((seat) => ({
      seat,
      bookedBy: loggedInname,
    }));

    const roomData = JSON.parse(localStorage.getItem('Rooms') || '{}');

    if (!roomData[hallNo]) {
      roomData[hallNo] = {};
    }

    if (!roomData[hallNo][movieName]) {
      roomData[hallNo][movieName] = [];
    }

    roomData[hallNo][movieName].push(...newlyBooked);

    localStorage.setItem('Rooms', JSON.stringify(roomData));

    this.bookedSeats = new Set([...this.bookedSeats, ...selectedSeatIds]);
    const ticket = {
      movieName: movieName,
      hallNo: hallNo,
      date: this.movie.showdate,
      time: this.movie.showtime,
      seats: selectedSeatIds,
      totalPrice: (this.movie.ticketprice ?? 0) * selectedSeatIds.length,
      user: {
        name: loggedInname,
        email: user.email,
      },
    };
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    // localStorage.setItem('ticket', JSON.stringify(ticket));
    // this.router.navigate(['/ticket']);
    this.selectedSeats.clear();
  }

  cancelSeats() {
    this.selectedSeats.clear();
  }
  print() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const user =
      userData?.consumer?.loggedin || userData?.admin?.loggedin || null;

    if (!user) {
      alert('Please login first.');
      return;
    }

    // Get all tickets
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    // Find the last ticket booked by this user
    const userTicket = tickets
      .reverse()
      .find((t: any) => t.user.email === user.email);

    if (userTicket) {
      // Store this ticket for the ticket page
      localStorage.setItem('lastTicket', JSON.stringify(userTicket));
      this.router.navigate(['/ticket']);
    } else {
      alert('Please choose and book tickets first.');
    }
    // this.router.navigate(['/ticket']);
  }
}
