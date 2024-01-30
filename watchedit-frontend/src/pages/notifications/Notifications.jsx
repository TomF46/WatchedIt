import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const notificationCount = useSelector((state) => state.notificationCount);
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
      toast.error(`Error reading notification ${err.message}`, {
        autoClose: false,
      });
    },
  });

  if (isLoading) return <LoadingMessage message={"Loading notifications"} />;

  if (error) {
    toast.error(`Error getting notifications ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
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
