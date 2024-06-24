import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { ReservationService } from '../services/reservations.services';
import { GuestService } from '../services/guest.services';
import { HotelService } from '../services/hotels.service';

import { Reservation } from 'src/app/models/reservation.model';

import moment from 'moment';
import { Guest } from 'src/app/models/guest.model';
import { HotelRoom } from 'src/app/models/hotel-room.model';
import { Hotel } from 'src/app/models/hotel.model';


@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule,
    ButtonModule, TooltipModule,
    DialogModule, InputTextModule,
    CalendarModule, DropdownModule, CheckboxModule],
  providers: [ReservationService, GuestService, HotelService],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {

  reservations: Array<Reservation> = [];
  guests: Array<Guest> = [];
  hotelRooms: Array<HotelRoom> = [];
  hotels: Array<Hotel> = [];
  currentReservation = this.createEmptyData();
  showModalReservation: boolean = false;

  constructor(private reservationService: ReservationService,
    private guestService: GuestService,
    private hotelService: HotelService) {

  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reservationService.getReservations().then((data) => {
      this.reservations = data;
      this.reservations.forEach((reservation) => {
        reservation.arrivalDateTs = moment(reservation.arrivalDate).toDate();
        reservation.departureDateTs = moment(reservation.departureDate).toDate();
        reservation.dates = [reservation.arrivalDateTs!, reservation.departureDateTs!];
        reservation.hotelId = reservation.hotelRoom?.hotelId;
      });

      console.log(this.reservations);

    }).catch((error) => {
      console.log(error);
    });
  }

  getFormData(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getGuests(),
        this.getHotelRooms()
      ]).then(() => {
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(false);
      });
    });
  }

  getGuests(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.guestService.getGuests().then((data) => {
        this.guests = data;

        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(false);
      });
    });
  }

  getHotelRooms(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.hotelService.getHotels().then((data) => {
        this.hotels = data;
        console.log(this.hotels);

        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(false);
      });
    });
  }

  createEmptyData(): Reservation {
    return new Reservation({});
  }

  newReservation() {
    this.getFormData().then(() => {
      this.currentReservation = this.createEmptyData();
      this.showModalReservation = true;
    });


  }

  saveReservation() {

    this.currentReservation.arrivalDate = moment(this.currentReservation.dates![0]).format('YYYY-MM-DD');
    this.currentReservation.departureDate = moment(this.currentReservation.dates![1]).format('YYYY-MM-DD');

    this.reservationService.saveReservation(this.currentReservation, this.currentReservation.id ? true : false).then((data) => {
      this.getData();
      this.showModalReservation = false;
    }).catch((error) => {
      console.log(error);
    });
  }

  editReservation(reservation: Reservation) {

    this.getFormData().then(() => {
      console.log(reservation);
      this.currentReservation = new Reservation(reservation);
      this.showModalReservation = true;
      this.onChangeHotel(reservation.hotelId!);
    });
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id!).then((data) => {
      this.getData();
    }).catch((error) => {
      console.log(error);
    });
  }

  onChangeHotel(value: string) {

    console.log(value);

    let hotelIndex = this.hotels.findIndex((hotel) => hotel.id === value);

    let rooms = this.hotels[hotelIndex].hotelRooms;
    if (rooms) {
      rooms.forEach((room: HotelRoom) => {
        room.name = room.room?.name + ' - Costo: ' + room.cost + ' - Numero: ' + room.number + ' - Piso: ' + room.floor;
      })

      this.hotelRooms = rooms;
    }
  }

}
