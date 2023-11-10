import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getPeoplePaginated } from "../../../api/peopleApi";
import PersonPreview from "../../People/PersonPreview";

function PeopleReel({ title, sort }) {
  const [peoplePaginator, setPeoplePaginator] = useState(null);
  const page = 1;
  const peoplePerPage = 8;

  useEffect(() => {
    getPeoplePaginated(page, peoplePerPage, sort)
      .then((res) => {
        setPeoplePaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting people ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, peoplePerPage, sort]);

  return (
    <div className="people-reel">
      {!peoplePaginator ? (
        <LoadingMessage message={"Loading people."} />
      ) : (
        <div className="mt-4">
          <Link
            to={"/people"}
            className="text-primary text-2xl hover:opacity-75"
          >
            {title}
          </Link>
          {peoplePaginator.data.length > 0 ? (
            <div className="grid grid-cols-16">
              {peoplePaginator.data.map((person) => {
                return (
                  <PersonPreview
                    key={person.id}
                    person={person}
                    isLink={true}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-primary text-2xl">
              No people match your search
            </p>
          )}
        </div>
      )}
    </div>
  );
}

PeopleReel.propTypes = {
  title: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

export default PeopleReel;
