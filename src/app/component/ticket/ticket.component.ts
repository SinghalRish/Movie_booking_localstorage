import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ticket } from '../../../ticket.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  ticket: ticket | null = null;
  router = inject(Router);
  ngOnInit() {
    const ticket = JSON.parse(localStorage.getItem('lastTicket') || 'null');
    if (!ticket) {
      alert('Please choose and book tickets first.');
      this.router.navigate(['/room-view']);
      return;
    }
    this.ticket = ticket;
  }

  printTicket() {
    window.print();
  }
}
