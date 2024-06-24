import { Injectable } from "@angular/core";
import { AppService } from "../../services/app.service";
import { environment } from "src/environments/environment.development";
import { Reservation } from "src/app/models/reservation.model";

@Injectable()
export class ReservationService {

    apiUrl: string;

    constructor(private appService: AppService) {
        this.apiUrl = environment.api + 'reservations';
    }

    getReservations(): Promise<Array<Reservation>> {
        return new Promise((resolve, reject) => {
            this.appService.get(this.apiUrl).then(
                (data: any) => {
                    resolve(data as Array<Reservation>);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    saveReservation(reservation: Reservation, edit: boolean): Promise<Reservation> {
        return new Promise((resolve, reject) => {
            this.appService.saveData(reservation, this.apiUrl, reservation.id!, edit).then((Response) => {
                resolve(Response as Reservation);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    deleteReservation(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.appService.delete(this.apiUrl + '/' + id).then((Response) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}