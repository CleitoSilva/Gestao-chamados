import { INotification } from "./INotification";

export interface IBaseResponse<T> {
  message: string;
  payload: T;
  notificationsNumber: number;
  notifications: INotification[];
}