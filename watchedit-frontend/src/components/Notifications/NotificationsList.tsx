import { format, parseISO } from "date-fns";
import { Notification } from "../../types/Notifications";
import TickIcon from "../Icons/TickIcon";

type Props = {
  notifications: Notification[];
  onSetRead: (notification: Notification) => void;
};

const NotificationsList = ({ notifications, onSetRead }: Props) => {
  return (
    <div className="grid grid-cols-12">
      {notifications.map((notification) => {
        return (
          <div key={notification.id} className="col-span-12">
            <div
              onClick={() => onSetRead(notification)}
              className={` ${
                notification.read ? "" : "hover:opacity-75"
              } grid grid-cols-24 cursor-pointer shadow my-1`}
            >
              <div
                className={`${
                  notification.read
                    ? "col-span-24 bg-backgroundOffset"
                    : "col-span-23 bg-backgroundOffset2"
                } p-2 rounded-l`}
                key={notification.id}
              >
                <p>
                  {notification.text} -{" "}
                  {format(
                    parseISO(notification.sentDate.toString()),
                    "dd/MM/yyyy HH:mm",
                  )}{" "}
                </p>
              </div>
              {!notification.read && (
                <div className="col-span-1 bg-primary flex items-center rounded-r">
                  <div className="mx-auto">
                    <TickIcon color="white" height={5} width={5} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsList;
