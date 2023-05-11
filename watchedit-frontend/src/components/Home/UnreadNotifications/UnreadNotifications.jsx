import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { decrementNotificationCount } from "../../../redux/actions/notificationCountActions";
import { getUnreadNotifications, readNotification } from "../../../api/notificationApi";
import NotificationsList from "../../Notifications/NotificationsList";
import PaginationControls from "../../PaginationControls";
import { Link } from "react-router-dom";

const UnreadNotifications = ({ decrementNotificationCount }) => {
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
        getUnreadNotifications(page, notificationsPerPage).then(notificationsData => {
            setNotificationsPaginator(notificationsData);
            setLastPageLoaded(page);
        }).catch(error => {
            toast.error(`Error getting notifications ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleReadNotification(notification) {
        if (notification.read) return;
        readNotification(notification.id).then(() => {
            decrementNotificationCount();
            getNotifications();
        }).catch(error => {
            toast.error(`Error reading notification ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    return (
        <div className="Notifications-page">
            {notificationsPaginator && (
                <div>
                {notificationsPaginator.data.length > 0 && (
                    <>
                        <Link to={"/notifications"} className="text-primary text-2xl hover:opacity-75 inline-flex items-center">
                            Unread notifications
                        </Link>
                        <NotificationsList notifications={notificationsPaginator.data} onSetRead={handleReadNotification} />
                        <PaginationControls
                            currentPage={page}
                            onNext={handleNextPage}
                            onPrevious={handlePreviousPage}
                            of={notificationsPaginator.of}
                            from={notificationsPaginator.from}
                            to={notificationsPaginator.to}
                            lastPage={notificationsPaginator.lastPage}
                        />
                    </>
                )}
            </div>
            )}
        </div >
    );
};

UnreadNotifications.propTypes = {
    decrementNotificationCount: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    decrementNotificationCount
};

export default connect(null, mapDispatchToProps)(UnreadNotifications);
