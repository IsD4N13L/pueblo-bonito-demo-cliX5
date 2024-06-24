import { HotelRoom } from "./hotel-room.model";

export class Hotel {
    id?: string;
    name?: string;
    address?: string;
    location?: string;
    hotelRooms?: Array<HotelRoom>

    constructor(init?: Partial<Hotel>) {
        Object.assign(this, init);
    }
}