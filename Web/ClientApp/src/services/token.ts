import { IToken } from '../models/IToken';
import { IDecodedToken } from '../models/IDecodedToken';
import { IUserAuthorizationHeaders } from '../models/IUserAuthorizationHeaders';
import { isBrowser } from './isBrowser';

const SECONDS_IN_MS = 1000;
const USER_LOCAL_STORAGE_NAME = "user";

export const Token = (function () {
    let isAuthenticated = false;
    let userId = "";
    let token = {} as IToken;

    const decodeToken = (token: string): IDecodedToken => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(window.atob(base64));

        return decodedToken;
    }

    const getUser = (): IToken | null => {
        const user: string | null = isBrowser() && localStorage.getItem("user");

        return user && JSON.parse(user);
    }

    const getToken = (): string | null => getUser()?.token;

    const TokenObj = {
        setToken: (token: IToken): void => {
            let tokenString = token.token;
            let decodedToken = decodeToken(tokenString);

            decodedToken.token = tokenString;

            isAuthenticated = true;
            userId = decodedToken.userId;

            isBrowser() && localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(decodedToken));
        },

        isUserAuthenticated: (): boolean => {
            const user = getUser();

            isAuthenticated = false;
            if (user) {
                if (decodeToken(user.token).exp < Date.now() / SECONDS_IN_MS) {
                    isBrowser() && localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
                    isAuthenticated = false;
                    userId = "0";
                } else {
                    isAuthenticated = true;
                }
            }

            return isAuthenticated;
        },

        getUserId: (): string => getUser()?.userId.toString(),

        getAuthorizationHeaders: (): IUserAuthorizationHeaders => {
            return {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            };
        },

        logout: (): void => {
            isAuthenticated = false;

            isBrowser() && localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
        }
    }

    return TokenObj;
}());
