import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { RoomService } from '../services/rooms.services';
import { Room } from 'src/app/models/room.model';
import { Option } from 'src/app/models/option.model';
import { RoomType } from '../../../enumerators/room.enum';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, TooltipModule, DialogModule, InputTextModule, DropdownModule],
  providers: [RoomService],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room> = [];
  currentRoom = this.createEmptyData();
  showModalRoom: boolean = false;
  typeOptions: Array<Option> = [];

  constructor(private roomService: RoomService) {

  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.roomService.getRooms().then((data) => {

      this.rooms = data;
    }).catch((error) => {
      console.log(error);
    });

    this.typeOptions = [
      new Option({ id: RoomType.Deluxe, name: RoomType.Deluxe }),
      new Option({ id: RoomType.Suit, name: RoomType.Suit }),
      new Option({ id: RoomType.Standard, name: RoomType.Standard }),
      new Option({ id: RoomType.Executive, name: RoomType.Executive })
    ];
  }

  createEmptyData(): Room {
    return new Room({});
  }

  newRoom() {
    this.currentRoom = this.createEmptyData();
    this.showModalRoom = true;
  }

  saveRoom() {
    let edit = this.currentRoom.id ? true : false;
    this.roomService.saveRoom(this.currentRoom, edit).then((data) => {
      this.getData();
      this.showModalRoom = false;
    }).catch((error) => {
      console.log(error);
    });

  }

  editRoom(room: Room) {
    this.currentRoom = new Room(room);
    this.showModalRoom = true;
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room.id!).then((data) => {
      this.getData();
    }).catch((error) => {
      console.log(error);
    });
  }

}
