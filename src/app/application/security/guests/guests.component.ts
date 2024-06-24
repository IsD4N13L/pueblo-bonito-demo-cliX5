import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { GuestService } from '../services/guest.services';
import { Guest } from 'src/app/models/guest.model';

import moment from 'moment';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, TooltipModule, DialogModule, InputTextModule, CalendarModule],
  providers: [GuestService],
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent {


  guests: Array<Guest> = [];
  currentGuest = this.createEmptyData();
  showModalGuest: boolean = false;

  constructor(private guestService: GuestService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.guestService.getGuests().then((data) => {

      this.guests = data;

      this.guests.forEach((guest) => {
        guest.birthdateTs = moment(guest.birthDate).toDate();
      });


    }).catch((error) => {
      console.log(error);
    });
  }

  createEmptyData(): Guest {
    return new Guest({});
  }

  newGuest() {
    this.currentGuest = this.createEmptyData();
    this.showModalGuest = true;
  }

  editGuest(guest: Guest) {
    this.currentGuest = new Guest(guest);
    this.showModalGuest = true;
  }

  saveGuest() {
    this.currentGuest.birthDate = moment(this.currentGuest.birthdateTs).format('YYYY-MM-DD');
    this.guestService.saveGuest(this.currentGuest, this.currentGuest.id ? true : false).then((data) => {
      this.getData();
      this.showModalGuest = false;
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteGuest(guest: Guest) {
    this.guestService.deleteGuest(guest.id!).then((data) => {
      this.getData();
    }).catch((error) => {
      console.log(error);
    });
  }


}
