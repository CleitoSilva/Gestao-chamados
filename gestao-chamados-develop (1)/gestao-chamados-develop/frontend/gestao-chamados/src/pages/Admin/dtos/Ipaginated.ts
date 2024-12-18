import { IListUser } from "./IListUser";

export interface IPaginatedUser {
    data: IListUser[];
    count: number;
}
