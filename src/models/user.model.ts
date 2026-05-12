export type UserPayload = {
    name: string;
    email: string;
};

export type UserData = UserPayload & {
    id: number;
};

export class UserModel {
    public readonly id: number;
    public readonly name: string;
    public readonly email: string;

    constructor(data: UserData) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }

    static fromDatabase(data: UserData): UserModel {
        return new UserModel(data);
    }

    toJSON(): UserData {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        };
    }
}
