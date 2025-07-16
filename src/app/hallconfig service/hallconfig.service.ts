import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HallconfigService {
  constructor(private route: ActivatedRoute) {
    const hallnumber = this.route.snapshot.paramMap.get('id');
    console.log(hallnumber);
  }
  room = {
    hallNumber: null,
    rows: null,
    seatsPerRow: null,
  };
  getroomconfig(hall: any) {
    let hallconfig = localStorage.getItem('HallConfigs');
    console.log('hall number is', hall);
    if (hallconfig) {
      let halldata = JSON.parse(hallconfig);
      this.room.hallNumber = hall;
      this.room.rows = halldata[hall].rows;
      this.room.seatsPerRow = halldata[hall].seatsPerRow;
    }

    return this.room;
  }

  generateRowLabels(rows: number): string[] {
    const rowLabels: string[] = [];
    for (let i = 0; i < rows; i++) {
      rowLabels.push(String.fromCharCode(65 + i)); // 65 = 'A'
    }
    return rowLabels;
  }

  generateSeatNumbers(seatsPerRow: number): number[] {
    return Array.from({ length: seatsPerRow }, (_, i) => i + 1);
  }
}
