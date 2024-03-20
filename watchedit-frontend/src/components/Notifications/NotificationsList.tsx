import { format, parseISO } from 'date-fns';
import { Notification } from '../../types/Notifications';
import TickIcon from '../Icons/TickIcon';

type Props = {
  notifications: Notification[];
  onSetRead: (notification: Notification) => void;
};

const NotificationsList = ({ notifications, onSetRead }: Props) => {
  return (
    <div className='grid grid-cols-12'>
      {notifications.map((notification) => {
        return (
          <div key={notification.id} className='col-span-12'>
            <div
              onClick={() => onSetRead(notification)}
              className={` ${
                notification.read ? '' : 'hover:opacity-75'
              } my-1 grid cursor-pointer grid-cols-24 shadow`}
            >
              <div
                className={`${
                  notification.read
                    ? 'col-span-24 bg-backgroundOffset'
                    : 'col-span-23 bg-backgroundOffset2'
                } rounded-l p-2`}
                key={notification.id}
              >
                <p>
                  {notification.text} -{' '}
                  {format(
                    parseISO(notification.sentDate.toString()),
                    'dd/MM/yyyy HH:mm',
                  )}{' '}
                </p>
              </div>
              {!notification.read && (
                <div className='col-span-1 flex items-center rounded-r bg-primary'>
                  <div className='mx-auto'>
                    <TickIcon color='white' height={5} width={5} />
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
