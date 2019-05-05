import {AccessLevel} from "../../shared/models/person.model";

export interface UserRegisterModel {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accessLevel: string;
}

export interface UserLoginModel {
    username: string;
    password: string;
}

export interface UserModel extends UserRegisterModel {
    token: string;
    id: string;
}

export interface UserTokenInfoModel {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    accessLevel: AccessLevel;
    exp: number;
    iat: number;
}
