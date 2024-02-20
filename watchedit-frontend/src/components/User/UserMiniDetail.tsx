import { Link } from "react-router-dom";
import { EditableUser, User } from "../../types/AuthDefinitions";

const UserMiniDetail = ({ user }: { user: User | EditableUser }) => {
  return (
    <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded">
      <div className="col-span-4">
        <img
          src={user.imageUrl}
          className="h-full headshot rounded-l"
          alt={`${user.username} profile picture.`}
        />
      </div>
      <div className="col-span-8 p-2">
        <Link
          to={`/profile/${user.id}`}
          className="text-primary font-semibold hover:opacity-75"
        >
          {user.username}
        </Link>
      </div>
    </div>
  );
};

export default UserMiniDetail;
