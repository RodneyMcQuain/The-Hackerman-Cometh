export interface IDecodedToken {
    userId: string;
    exp: number;
    iss: string;
    aud: string;
    token: string;
}