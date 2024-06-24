import { Guest } from "./guest.model";
import { HotelRoom } from "./hotel-room.model";

export class Reservation {
    id?: string;
    guestId?: string;
    hotelRoomId?: string;
    hotelId?: string;
    arrivalDate?: string;
    departureDate?: string;

    arrivalDateTs?: Date;
    departureDateTs?: Date;
    dates?: Array<Date>;

    totalAdults?: number;
    totalChildren?: number;
    status?: boolean;
    allInclusive?: boolean;
    guest?: Guest;
    hotelRoom?: HotelRoom;

    constructor(init?: Partial<Reservation>) {
        Object.assign(this, init);
    }
}