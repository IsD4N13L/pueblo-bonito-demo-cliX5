export class Room {
    id?: string;
    name?: string;
    type?: string;

    constructor(init?: Partial<Room>) {
        Object.assign(this, init);
    }
}