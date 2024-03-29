import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllNotifications,
  readNotification,
} from '../../api/notificationApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import NotificationsList from '../../components/Notifications/NotificationsList';
import PaginationControls from '../../components/PaginationControls';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import { Notification } from '../../types/Notifications';
import { decrementNotificationsCount } from '../../redux/reducers/notificationsReducer';
import useNotifictionCount from '../../hooks/useNotificationCount';

const NotificationsPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const notificationCount = useNotifictionCount();
  const [page, setPage] = useState(1);
  const notificationsPerPage = 32;

  const {
    isLoading,
    data: notificationsPaginator,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notifications', page, notificationsPerPage],
    queryFn: () =>
      getAllNotifications(page, notificationsPerPage).then((res) => {
        return res;
      }),
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

  if (isLoading) return <LoadingMessage message={'Loading notifications'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading notifications.'}
        error={error.data.Exception}
      />
    );
  }

  if (notificationsPaginator)
    return (
      <div className='Notifications-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          Notifications {`(${notificationCount})`}
        </h1>
        {notificationsPaginator.data.length > 0 ? (
          <>
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
        ) : (
          <p className='text-center text-2xl text-primary'>
            You have no notifications
          </p>
        )}
      </div>
    );
};

export default NotificationsPage;
