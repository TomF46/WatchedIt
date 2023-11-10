import { useCallback, useEffect, useState } from "react";
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

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const notificationCount = useSelector((state) => state.notificationCount);
  const [notificationsPaginator, setNotificationsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const notificationsPerPage = 32;

  const getNotifications = useCallback(() => {
    getAllNotifications(page, notificationsPerPage)
      .then((notificationsData) => {
        setNotificationsPaginator(notificationsData);
      })
      .catch((error) => {
        toast.error(`Error getting notifications ${error.message}`, {
          autoClose: false,
        });
      });
  }, [page, notificationsPerPage]);

  useEffect(() => {
    getNotifications();
  }, [page, getNotifications]);

  function handleReadNotification(notification) {
    if (notification.read) return;
    readNotification(notification.id)
      .then(() => {
        dispatch(decrementNotificationCount());
        getNotifications();
      })
      .catch((error) => {
        toast.error(`Error reading notification ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="Notifications-page">
      {!notificationsPaginator ? (
        <LoadingMessage message={"Loading notifications"} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-bold">
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
      )}
    </div>
  );
};

export default NotificationsPage;
