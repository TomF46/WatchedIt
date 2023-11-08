import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { decrementNotificationCount } from "../../../redux/actions/notificationCountActions";
import {
  getUnreadNotifications,
  readNotification,
} from "../../../api/notificationApi";
import NotificationsList from "../../Notifications/NotificationsList";
import PaginationControls from "../../PaginationControls";
import { Link } from "react-router-dom";

const UnreadNotifications = () => {
  const dispatch = useDispatch();
  const [notificationsPaginator, setNotificationsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const notificationsPerPage = 8;
  const [lastPageLoaded, setLastPageLoaded] = useState(null);

  useEffect(() => {
    if (!notificationsPaginator) {
      getNotifications();
    }
  }, [notificationsPaginator]);

  useEffect(() => {
    if (lastPageLoaded != null) getNotifications();
  }, [page]);

  function getNotifications() {
    getUnreadNotifications(page, notificationsPerPage)
      .then((notificationsData) => {
        setNotificationsPaginator(notificationsData);
        setLastPageLoaded(page);
      })
      .catch((error) => {
        toast.error(`Error getting notifications ${error.message}`, {
          autoClose: false,
        });
      });
  }

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
      {notificationsPaginator && (
        <div>
          {notificationsPaginator.data.length > 0 && (
            <>
              <Link
                to={"/notifications"}
                className="text-primary text-2xl hover:opacity-75 inline-flex items-center"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="ml-1">Unread notifications</span>
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
      )}
    </div>
  );
};

export default UnreadNotifications;
