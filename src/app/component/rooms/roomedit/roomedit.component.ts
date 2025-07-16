import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HallconfigService } from '../../../hallconfig service/hallconfig.service';

@Component({
  selector: 'app-roomedit',
  imports: [CommonModule, FormsModule],
  templateUrl: './roomedit.component.html',
  styleUrl: './roomedit.component.css',
})
export class RoomeditComponent implements OnInit {
  room = {
    hallNumber: null,
    rows: null,
    seatsPerRow: null,
  };
  hallconfigservice = inject(HallconfigService);
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    const hallnumber = this.route.snapshot.paramMap.get('id');
    this.room = this.hallconfigservice.getroomconfig(hallnumber);
  }
  // getroomconfig(hall: any) {
  //   let hallconfig = localStorage.getItem('HallConfigs');
  //   console.log('hall number is', hall);
  //   // if (hallconfig) console.log(JSON.parse(hallconfig[hall]));
  //   if (hallconfig) {
  //     let halldata = JSON.parse(hallconfig);
  //     this.room.hallNumber = hall;
  //     this.room.rows = halldata[hall].rows;
  //     this.room.seatsPerRow = halldata[hall].seatsPerRow;
  //   }
  // }
  saveRoomConfig() {
    if (
      this.room.hallNumber == null ||
      this.room.rows == null ||
      this.room.seatsPerRow == null
    ) {
      alert('Please fill all fields');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('HallConfigs') || '{}');
    existing[this.room.hallNumber] = {
      rows: this.room.rows,
      seatsPerRow: this.room.seatsPerRow,
    };
    localStorage.setItem('HallConfigs', JSON.stringify(existing));

    alert('Room configuration saved!');
    this.room = { hallNumber: null, rows: null, seatsPerRow: null }; // clear form
  }
}
