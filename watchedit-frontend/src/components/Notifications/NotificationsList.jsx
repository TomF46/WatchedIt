import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from 'date-fns'

const NotificationsList = ({ notifications, onSetRead }) => {
    return (
        <div className="grid grid-cols-12">
            {notifications.map((notification) => {
                return (
                    <div className={`col-span-12 ${notification.read ? 'bg-backgroundOffset' : 'bg-backgroundOffset2' } cursor-pointer hover:opacity-75 shadow rounded my-1 p-4`} key={notification.id}  onClick={() => onSetRead(notification)}>
                        <p>{notification.text} - {format(parseISO(notification.sentDate), "dd/MM/yyyy HH:mm")} </p>
                    </div>
                )
            })}
        </div>
    );
};

NotificationsList.propTypes = {
    notifications: PropTypes.array.isRequired,
    onSetRead: PropTypes.func.isRequired
};

export default NotificationsList;
