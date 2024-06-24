import { Injectable } from "@angular/core";
import { AppService } from "../../services/app.service";
import { Guest } from "src/app/models/guest.model";
import { environment } from "src/environments/environment.development";

@Injectable()
export class GuestService {
    apiUrl: string;

    constructor(private appService: AppService) {
        this.apiUrl = environment.api + 'guests';
    }

    getGuests(): Promise<Array<Guest>> {
        return new Promise((resolve, reject) => {
            this.appService.get(this.apiUrl).then(
                (data: any) => {
                    resolve(data as Array<Guest>);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    saveGuest(guest: Guest, edit: boolean): Promise<Guest> {
        return new Promise((resolve, reject) => {
            this.appService.saveData(guest, this.apiUrl, guest.id!, edit).then((Response) => {
                resolve(Response as Guest);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    deleteGuest(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.appService.delete(this.apiUrl + '/' + id).then((Response) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}