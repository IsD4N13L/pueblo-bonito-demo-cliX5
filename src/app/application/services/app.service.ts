import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    get(url: string) {
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(url, data).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    put(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.http.put(url, data).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    delete(url: string) {
        return new Promise((resolve, reject) => {
            this.http.delete(url).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    saveData<T>(data: T, uriApi: string, id:string, edit: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (edit) {
                this.put(uriApi + '/' + id, data).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(new Error("ErrorConexion"));
                });
            } else {
                this.post(uriApi, data).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(new Error("ErrorConexion"));
                });
            }
        });
    }
}