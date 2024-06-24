import { Injectable } from "@angular/core";
import { Hotel } from "src/app/models/hotel.model";
import { AppService } from "../../services/app.service";
import { environment } from "src/environments/environment.development";

@Injectable()
export class HotelService {
    apiUrl: string;

    constructor(private appService: AppService) {
        this.apiUrl = environment.api + 'hotels';
    }

    getHotels(): Promise<Array<Hotel>> {
        return new Promise((resolve, reject) => {
            this.appService.get(this.apiUrl).then(
                (data: any) => {
                    resolve(data as Array<Hotel>);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    saveHotel(hotel: Hotel, edit: boolean): Promise<Hotel> {
        return new Promise((resolve, reject) => {
            this.appService.saveData(hotel, this.apiUrl, hotel.id!, edit).then((Response) => {
                resolve(Response as Hotel);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    deleteHotel(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.appService.delete(this.apiUrl + '/' + id).then((Response) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}