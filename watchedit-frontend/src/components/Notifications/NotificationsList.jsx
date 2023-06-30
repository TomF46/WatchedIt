import PropTypes from "prop-types";
import { format, parseISO } from 'date-fns'

const NotificationsList = ({ notifications, onSetRead }) => {
    return (
        <div className="grid grid-cols-12">
            {notifications.map((notification) => {
                return (
                    <div className="col-span-12">
                        <div onClick={() => onSetRead(notification)} className={` ${notification.read ? "" : "hover:opacity-75"} grid grid-cols-24 cursor-pointer shadow rounded-l my-1`}>
                            <div className={`${notification.read ? 'col-span-24 bg-backgroundOffset' : 'col-span-23 bg-backgroundOffset2' } p-4`} key={notification.id} >
                                <p>{notification.text} - {format(parseISO(notification.sentDate), "dd/MM/yyyy HH:mm")} </p>
                            </div>
                            {!notification.read && (
                                <div className="col-span-1 bg-primary flex items-center">
                                    <svg className="text-white h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" strokeWidth={2} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            )}
                        </div>
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