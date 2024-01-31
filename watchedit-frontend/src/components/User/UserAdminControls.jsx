import PropTypes from "prop-types";
import { setUserCanPublishByUserId } from "../../api/usersApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function UserAdminControls({ user, onUserReload }) {
  const setUserCanPublish = useMutation({
    mutationFn: (canPublish) => setUserCanPublishByUserId(user.id, canPublish),
    onSuccess: (res) => {
      toast.success(`User ${res.canPublish ? "set" : "removed"} as publisher.`);
      onUserReload();
    },
    onError: (err) => {
      toast.error(
        `Error setting user publisher status. ${err.data.Exception}`,
        {
          autoClose: false,
        },
      );
    },
  });

  return (
    <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
      <div className="bg-backgroundOffset2 rounded-t-md">
        <p className="text-primary font-semibold text-lg px-2 py-1">
          Admin controls
        </p>
      </div>
      <div className="px-2 py-2">
        <button
          onClick={() => setUserCanPublish.mutate(!user.canPublish)}
          className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
        >
          {user.canPublish ? "Remove as publisher" : "Add as publisher"}
        </button>
      </div>
    </div>
  );
}

UserAdminControls.propTypes = {
  user: PropTypes.object.isRequired,
  onUserReload: PropTypes.func.isRequired,
};

export default UserAdminControls;
