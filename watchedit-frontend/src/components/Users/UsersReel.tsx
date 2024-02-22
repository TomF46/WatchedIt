import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserPreview from "../User/UserPreview";
import { getUsersPaginated } from "../../api/usersApi";
import LoadingMessage from "../Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/Auth";

type Props = {
  title: string;
  sort: string;
};

function UsersReel({ title, sort }: Props) {
  const page = 1;
  const usersPerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", sort, page, usersPerPage],
    queryFn: () =>
      getUsersPaginated(page, usersPerPage, sort).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={"Loading users."} />;

  if (error) {
    toast.error(`Error getting users ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className="users-reel">
        <div className="mt-4">
          <Link
            to={"/users"}
            className="text-primary font-semibold text-2xl hover:opacity-75"
          >
            {title}
          </Link>
          {data.length > 0 ? (
            <div className="grid grid-cols-16">
              {data.map((user: User) => {
                return <UserPreview key={user.id} user={user} isLink={true} />;
              })}
            </div>
          ) : (
            <p className="text-center text-primary text-2xl">
              No users match your search
            </p>
          )}
        </div>
      </div>
    );
}

export default UsersReel;
