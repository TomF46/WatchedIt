import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getUnreadNotifications,
  readNotification,
} from '../../../api/notificationApi';
import NotificationsList from '../../Notifications/NotificationsList';
import PaginationControls from '../../PaginationControls';
import { Link } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { AppDispatch, useAppDispatch } from '../../../redux/store';
import { Notification } from '../../../types/Notifications';
import { decrementNotificationsCount } from '../../../redux/reducers/notificationsReducer';
import BellIcon from '../../Icons/BellIcon';

const UnreadNotifications = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const notificationsPerPage = 6;

  const {
    isLoading,
    data: notificationsPaginator,
    error,
    refetch,
  } = useQuery({
    queryKey: ['unread-notifications', page, notificationsPerPage],
    queryFn: () => getUnreadNotifications(page, notificationsPerPage),
    placeholderData: keepPreviousData,
  });

  const setNotificationRead = useMutation({
    mutationFn: (notification: Notification) =>
      readNotification(notification.id),
    onSuccess: () => {
      dispatch(decrementNotificationsCount());
      refetch();
    },
    onError: (err) => {
      toast.error(`Error reading notification ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleReadNotification(notification: Notification) {
    if (notification.read) return;
    setNotificationRead.mutate(notification);
  }

  if (error) {
    toast.error(`Error getting unread notifications ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (!isLoading && notificationsPaginator)
    return (
      <div className='Notifications-page'>
        <div>
          {notificationsPaginator.data.length > 0 && (
            <>
              <Link
                to={'/notifications'}
                className='inline-flex items-center text-2xl font-semibold text-primary hover:opacity-75'
              >
                <BellIcon color='primary' height={6} width={6} />
                <span className='ml-1'>Unread notifications</span>
              </Link>
              <NotificationsList
                notifications={notificationsPaginator.data}
                onSetRead={handleReadNotification}
              />
              <PaginationControls
                currentPage={page}
                onPageChange={setPage}
                of={notificationsPaginator.of}
                from={notificationsPaginator.from}
                to={notificationsPaginator.to}
                lastPage={notificationsPaginator.lastPage}
              />
            </>
          )}
        </div>
      </div>
    );
};

export default UnreadNotifications;
