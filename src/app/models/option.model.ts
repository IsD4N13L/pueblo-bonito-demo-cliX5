export class Option {
    id?: string;
    name?: string;

    constructor(init?: Partial<Option>) {
        Object.assign(this, init);
    }
}