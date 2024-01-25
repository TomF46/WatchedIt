import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getPeoplePaginated } from "../../../api/peopleApi";
import PersonPreview from "../../People/PersonPreview";
import { useQuery } from "@tanstack/react-query";

function PeopleReel({ title, subtitle, sort }) {
  const page = 1;
  const peoplePerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ["people", sort, peoplePerPage, page],
    queryFn: () =>
      getPeoplePaginated(page, peoplePerPage, sort).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={"Loading people."} />;

  if (error) {
    toast.error(`Error getting people ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="people-reel">
      <div className="mt-4">
        <Link
          to={"/people"}
          className="text-primary text-2xl hover:opacity-75 font-semibold"
        >
          {title}
        </Link>
        {subtitle && <p>{subtitle}</p>}
        {data.length > 0 ? (
          <div className="grid grid-cols-16">
            {data.map((person) => {
              return (
                <PersonPreview key={person.id} person={person} isLink={true} />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-primary text-2xl">
            No people match your search
          </p>
        )}
      </div>
    </div>
  );
}

PeopleReel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  sort: PropTypes.string.isRequired,
};

export default PeopleReel;
