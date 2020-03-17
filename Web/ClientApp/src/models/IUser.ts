export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    dateCreated: string;
    [key: string]: any;
}
