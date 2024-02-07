import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { decrementNotificationCount } from "../../redux/actions/notificationCountActions";
import {
  getAllNotifications,
  readNotification,
} from "../../api/notificationApi";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import NotificationsList from "../../components/Notifications/NotificationsList";
import PaginationControls from "../../components/PaginationControls";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";

const NotificationsPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const notificationCount = useSelector((state : RootState) => state.notificationCount);
  const [page, setPage] = useState(1);
  const notificationsPerPage = 32;

  const {
    isLoading,
    data: notificationsPaginator,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications", page, notificationsPerPage],
    queryFn: () =>
      getAllNotifications(page, notificationsPerPage).then((res) => {
        return res;
      }),
    placeholderData: keepPreviousData,
  });

  const setNotificationRead = useMutation({
    mutationFn: (notification) => readNotification(notification.id),
    onSuccess: () => {
      dispatch(decrementNotificationCount());
      refetch();
    },
    onError: (err) => {
      toast.error(`Error reading notification ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  if (isLoading) return <LoadingMessage message={"Loading notifications"} />;

  if (error) {
    return (
      <ErrorMessage message={"Error loading notifications."} error={error} />
    );
  }

  function handleReadNotification(notification) {
    if (notification.read) return;
    setNotificationRead.mutate(notification);
  }

  return (
    <div className="Notifications-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
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
        <p className="text-center text-primary text-2xl">
          You have no notifications
        </p>
      )}
    </div>
  );
};

export default NotificationsPage;
