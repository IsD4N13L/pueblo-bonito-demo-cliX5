import { Injectable } from "@angular/core";
import { Room } from "src/app/models/room.model";
import { AppService } from "../../services/app.service";
import { environment } from "src/environments/environment.development";

@Injectable()
export class RoomService {

    apiUrl: string;

    constructor(private appService: AppService) {
        this.apiUrl = environment.api + 'rooms';
    }

    getRooms(): Promise<Array<Room>> {
        return new Promise((resolve, reject) => {
            this.appService.get(this.apiUrl).then(
                (data: any) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    getRoomsMemory(): Promise<Array<Room>> {
        return new Promise((resolve, reject) => {
            this.appService.get(this.apiUrl + '/singleton').then(
                (data: any) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    saveRoom(room: Room, edit: boolean): Promise<Room> {
        console.log(room);
        return new Promise((resolve, reject) => {
            this.appService.saveData(room, this.apiUrl, room.id!, edit).then((Response) => {
                resolve(Response);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    deleteRoom(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.appService.delete(this.apiUrl + '/' + id).then((Response) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}