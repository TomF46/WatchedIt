import { User } from './Auth';
import { PaginationResponse } from './PaginationResponse';

export type Notification = {
  id: number;
  recipient: User;
  text: string;
  type: number;
  sentDate: Date;
  read: boolean;
};

type Notifications = {
  data: Notification[];
};

export type NotificationsPaginationResponse = Notifications &
  PaginationResponse;
