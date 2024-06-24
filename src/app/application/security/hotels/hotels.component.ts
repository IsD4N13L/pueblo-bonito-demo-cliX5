import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HotelService } from '../services/hotels.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { Hotel } from 'src/app/models/hotel.model';
import { HotelRoom } from 'src/app/models/hotel-room.model';
import { RoomService } from '../services/rooms.services';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule,
    TableModule, ButtonModule,
    TooltipModule, DialogModule,
    InputTextModule, PanelModule,
    DropdownModule, CheckboxModule],
  providers: [HotelService, RoomService],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels: Array<Hotel> = [];
  rooms: Array<Room> = [];
  currentHotel = this.createEmptyData();
  currentRoom: HotelRoom = this.createEmptyHotelRoom();
  showModalHotel: boolean = false;
  showModalRoom: boolean = false;

  constructor(private hotelService: HotelService, private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.hotelService.getHotels().then((data) => {

      this.hotels = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  getRooms() {
    this.roomService.getRoomsMemory().then((data) => {
      this.rooms = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  newHotel() {
    this.currentHotel = this.createEmptyData();
    this.showModalHotel = true;
  }

  createEmptyData(): Hotel {
    return new Hotel({
      hotelRooms: [],
    });
  }

  createEmptyHotelRoom(): HotelRoom {
    return new HotelRoom({});
  }

  saveHotel() {
    this.hotelService.saveHotel(this.currentHotel, this.currentHotel.id ? true : false).then(() => {
      this.getData();
      this.showModalHotel = false;
    }).catch((error) => {
      console.log(error);
    });
  }

  editHotel(hotel: Hotel) {
    this.currentHotel = new Hotel(hotel);
    this.showModalHotel = true;
  }

  deleteHotel(hotel: Hotel) {
    this.hotelService.deleteHotel(hotel.id!).then(() => {
      this.getData();
    }).catch((error) => {
      console.log(error);
    });
  }


  newRoom() {
    this.getRooms();

    this.currentRoom = this.createEmptyHotelRoom();
    this.showModalRoom = true;
  }

  addHotelRoom() {
    this.currentRoom.room = this.rooms.find(room => room.id === this.currentRoom.roomId);

    if (this.currentRoom.id === undefined) {
      this.currentHotel.hotelRooms?.push(this.currentRoom);
    }
    else {

      let hotelRoomIndex = this.currentHotel.hotelRooms?.findIndex(hotelRoom => hotelRoom.id === this.currentRoom.id);
      if (hotelRoomIndex! > -1) {
        this.currentHotel.hotelRooms?.splice(hotelRoomIndex!, 1, this.currentRoom);
      } else {
        this.currentHotel.hotelRooms?.push(this.currentRoom);
      }
    }

    this.showModalRoom = false;
  }
  
  editHotelRoom(room: HotelRoom) {
    this.getRooms();
    this.currentRoom = new HotelRoom(room);
    this.showModalRoom = true;
  }

  deleteHotelRoom(room: HotelRoom) {
    this.currentHotel.hotelRooms = this.currentHotel.hotelRooms?.filter(hotelRoom => hotelRoom.id !== room.id);
  }
}
