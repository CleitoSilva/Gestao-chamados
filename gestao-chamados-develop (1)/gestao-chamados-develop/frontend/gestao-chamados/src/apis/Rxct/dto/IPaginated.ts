import { IListArea } from "./IListArea";
import { IListUser } from "./IListUser";

export interface IPaginatedUser {
    data: IListUser[];
    count: number;
};

export interface IPaginatedArea {
    data: IListArea[];
    count: number;
}