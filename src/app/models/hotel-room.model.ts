import { Hotel } from "./hotel.model";
import { Room } from "./room.model";

export class HotelRoom {
    id?: string;
    hotelId?: string;
    roomId?: string;
    hasSeaView?: boolean;
    number?: number;
    floor?: number;
    cost?: number;
    status?: boolean;
    hotel?: Hotel;
    room?: Room;
    name?: string;

    constructor(init?: Partial<HotelRoom>) {
        Object.assign(this, init);
    }
}