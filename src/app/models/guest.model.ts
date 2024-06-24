export class Guest {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    birthDate?: string;
    lastName?: string;

    birthdateTs?: Date;

    constructor(init?: Partial<Guest>) {
        Object.assign(this, init);
    }
}