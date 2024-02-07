import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserPreview = ({ user, isLink }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 mt-2">
      <div
        onClick={() => {
          if (isLink) navigate(`/profile/${user.id}`);
        }}
        className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded"
      >
        <img
          src={user.imageUrl}
          className="w-full headshot rounded-t"
          alt={`${user.username} profile picture.`}
        />
        <div className="p-2">
          <div className="grid grid-cols-12">
            <div className="col-span-6 relative">
              <div className="text-center inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-success"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="ml-1">{user.watchedFilmCount}</p>
              </div>
            </div>
            <div className="col-span-6 relative">
              <div className="text-center inline-flex items-center absolute right-0 top-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-rating"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <p className="ml-1">{user.reviewCount}</p>
              </div>
            </div>
            <div className="col-span-12">
              <h3 className="text-center text-primary">{user.username}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserPreview.propTypes = {
  user: PropTypes.object.isRequired,
  isLink: PropTypes.bool.isRequired,
};

export default UserPreview;
